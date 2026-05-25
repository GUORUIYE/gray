import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
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

function AppContent() {
  const isLoading = useUserStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#E8953C] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  return (
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
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
