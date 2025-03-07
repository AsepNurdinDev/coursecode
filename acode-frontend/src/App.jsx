import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Courses from "./pages/courses/Courses"; 
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import HtmlCourse from "./pages/courses/html/HtmlCourse";
import AboutHtml from "./pages/courses/html/About/AboutHtml";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/html/*" element={<HtmlCourse />} />
        <Route path="/courses/html/About" element={<AboutHtml />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
