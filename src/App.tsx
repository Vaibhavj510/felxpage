/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreatePage from "./pages/CreatePage";
import PublicProfile from "./pages/PublicProfile";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/:username" element={<PublicProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

