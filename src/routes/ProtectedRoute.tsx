import { Navigate } from "react-router-dom";
import { useAuth } from "../components/Athontication/AuthContext";

interface ProtectedRouteProps {
  role: "admin" | "user";
  children: React.ReactNode;
}

export default function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
