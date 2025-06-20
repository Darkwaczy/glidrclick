
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-glidr-purple" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and save the intended destination
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to dashboard if admin access is required but user is not an admin
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
