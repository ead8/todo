import { Navigate } from "react-router-dom";
import useStore from "../store";

const ProtectedRoute = ({ children }) => {
  const { user } = useStore();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
