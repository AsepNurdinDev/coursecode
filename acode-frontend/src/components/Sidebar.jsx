import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="hover:text-blue-400">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/courses" className="hover:text-blue-400">
            Courses
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
