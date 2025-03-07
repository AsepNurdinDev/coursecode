import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
