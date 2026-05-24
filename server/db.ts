import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.json');

export const db = {
  users: [] as any[],
  profiles: [] as any[],
  photos: [] as any[],
};

export const initDb = async () => {
  if (fs.existsSync(dbPath)) {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    db.users = data.users || [];
    db.profiles = data.profiles || [];
    db.photos = data.photos || [];
  } else {
    saveDb();
  }
};

export const saveDb = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

