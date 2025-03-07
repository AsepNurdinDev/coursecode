import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 h-screen bg-gray-800 text-white">
        <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin/users" className="block p-4 hover:bg-gray-700">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/courses" className="block p-4 hover:bg-gray-700">
              Courses
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/admin/login";
              }}
              className="block p-4 w-full text-left hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
