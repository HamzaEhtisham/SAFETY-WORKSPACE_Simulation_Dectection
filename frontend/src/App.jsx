import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PhishingSimulator from "./pages/PhishingSimulator";
import UserPanelPage from "./pages/UserPanelPage"; // Changed import
import AdminPanel from "./components/adminpanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Topics from "./pages/Topics";
import SubTopics from "./pages/SubTopics";
import PhishingDetector from "./pages/PhishingDetector";
import Navbar from "./components/Navbar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId" element={<SubTopics />} />
          <Route
            path="/simulator/:topicId/:subTopicId?"
            element={
              <PhishingSimulator
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            }
          />
          <Route path="/user-panel" element={<UserPanelPage />} />{" "}
          {/* Changed component */}
          <Route path="/detect" element={<PhishingDetector />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
