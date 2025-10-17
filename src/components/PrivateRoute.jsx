    import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const UserRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? children : <Navigate to="/user/signup" />;
};

export const AdminRoute = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  return isAdmin ? children : <Navigate to="/admin/login" />;
};


export const PublicRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  if (isLoggedIn) return <Navigate to="/user/home" />;

  if (isAdmin) return <Navigate to="/admin-dashboard" />;

  return children;
};