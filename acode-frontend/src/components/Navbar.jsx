import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");             
  };

  return (
    <nav className="bg-slate-500 text-white p-4 flex justify-between">
      <h1 className="text-lg font-semibold">CodeCourse</h1>
      <div>
        {!token ? (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <Link to="/courses">Kursus</Link>
        )}
      </div>
      {token && (
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
