import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import fileUpload from "express-fileupload";
import { createServer as createViteServer } from "vite";
import { initDb, db, saveDb } from "./server/db.js";
import { v4 as uuidv4 } from "uuid";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

async function startServer() {
  await initDb();
  console.log("Database initialized");

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(fileUpload({ createParentPath: true }));
  app.use("/uploads", express.static(uploadsDir));

  // --- Mock Auth Middleware for Demo ---
  // In a real app we would use JWT or Supabase sessions
  app.use((req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (userId) {
      req.user = { id: userId as string };
    }
    next();
  });

  // --- API Routes ---

  // Auth: Login / Register (Mocked to generate and return a session)
  app.post("/api/auth/login", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });
    
    let user = db.users.find(u => u.email === email);
    if (!user) {
      const newId = uuidv4();
      user = { id: newId, email, consent_given_at: new Date().toISOString() };
      db.users.push(user);
      saveDb();
    }
    
    // In demo, we just return the user ID to act as a token
    res.json({ user, token: user.id });
  });

  // Get current user dashboard
  app.get("/api/dashboard", (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const profiles = db.profiles.filter(p => p.user_id === req.user!.id).map(p => ({ ...p }));
    
    // Fetch photos for these profiles
    for (const profile of profiles) {
      profile.photos = db.photos.filter(pt => pt.profile_id === profile.id).sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      if (typeof profile.data === "string") profile.data = JSON.parse(profile.data);
    }
    res.json({ profiles });
  });

  // Create Profile
  app.post("/api/profiles", (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const { username, page_type, template_id, data } = req.body;
    
    // Check if username taken
    const existing = db.profiles.find(p => p.username === username);
    if (existing) return res.status(400).json({ error: "Username already taken" });
    
    const profileId = uuidv4();
    const newProfile = {
      id: profileId,
      user_id: req.user.id,
      username,
      page_type,
      template_id,
      data: JSON.stringify(data),
      is_published: 1,
      view_count: 0
    };
    db.profiles.push(newProfile);
    saveDb();

    res.json({ id: profileId, username });
  });

  // Update Profile
  app.put("/api/profiles/:id", (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const { data } = req.body;
    const profileId = req.params.id;

    const profileIndex = db.profiles.findIndex(p => p.id === profileId && p.user_id === req.user!.id);
    if (profileIndex === -1) return res.status(404).json({ error: "Profile not found" });

    db.profiles[profileIndex].data = JSON.stringify(data);
    db.profiles[profileIndex].updated_at = new Date().toISOString();
    saveDb();
    
    res.json({ success: true });
  });

  // Upload Photo
  app.post("/api/profiles/:id/photos", async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    try {
      if (!req.files || !req.files.photo) {
        return res.status(400).json({ error: "No photo uploaded" });
      }

      const profile = db.profiles.find(p => p.id === req.params.id && p.user_id === req.user!.id);
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const photo = req.files.photo as fileUpload.UploadedFile;
      const ext = path.extname(photo.name);
      const filename = `${uuidv4()}${ext}`;
      const savePath = path.join(uploadsDir, filename);

      await photo.mv(savePath);

      const url = `/uploads/${filename}`;
      const photoId = uuidv4();
      
      db.photos.push({ id: photoId, profile_id: profile.id, url, display_order: 0 });
      saveDb();
      
      res.json({ id: photoId, url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  // Delete Photo
  app.delete("/api/photos/:id", (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const photo = db.photos.find(p => p.id === req.params.id);
    if (!photo) return res.status(403).json({ error: "Forbidden" });

    const profile = db.profiles.find(p => p.id === photo.profile_id);
    if (!profile || profile.user_id !== req.user.id) return res.status(403).json({ error: "Forbidden" });

    db.photos = db.photos.filter(p => p.id !== req.params.id);
    saveDb();
    
    res.json({ success: true });
  });

  // Public Profile View
  app.get("/api/public/:username", (req, res) => {
    const profile = db.profiles.find(p => p.username === req.params.username && p.is_published === 1);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    profile.view_count = (profile.view_count || 0) + 1;
    saveDb();

    const responseProfile = { ...profile };
    if (typeof responseProfile.data === "string") {
      responseProfile.data = JSON.parse(responseProfile.data);
    }
    responseProfile.photos = db.photos.filter(p => p.profile_id === profile.id).sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

    res.json(responseProfile);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
