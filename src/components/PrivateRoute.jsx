    import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// For user-protected pages
export const UserRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? children : <Navigate to="/user/signup" />;
};

// For admin-protected pages
export const AdminRoute = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  return isAdmin ? children : <Navigate to="/admin/login" />;
};


export const PublicRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  // If user is logged in, redirect to user home
  if (isLoggedIn) return <Navigate to="/user/home" />;

  // If admin is logged in, redirect to admin dashboard
  if (isAdmin) return <Navigate to="/admin-dashboard" />;

  return children;
};