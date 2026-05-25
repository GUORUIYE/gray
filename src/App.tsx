import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Courses from "@/pages/Courses";
import Learn from "@/pages/Learn";
import Progress from "@/pages/Progress";
import Community from "@/pages/Community";
import Achievements from "@/pages/Achievements";
import Profile from "@/pages/Profile";
import Path from "@/pages/Path";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/learn/:courseId" element={<Learn />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/community" element={<Community />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/path" element={<Path />} />
      </Routes>
    </Router>
  );
}
