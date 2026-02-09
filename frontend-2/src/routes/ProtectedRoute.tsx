import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { UserRole } from 'src/types';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth: boolean;
  allowedRoles?: UserRole[]; // Optional role restriction
}

const ProtectedRoute = ({ children, requireAuth, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const role = useAppSelector((state) => state.auth.user?.role);
  const isAuthenticated = useAppSelector((state) => !!state.auth.accessToken);

  // Get route configuration from location state (if available)
  const routeState = location.state as { allowedRoles?: UserRole[] } | undefined;
  const effectiveAllowedRoles = allowedRoles || routeState?.allowedRoles;

  // Handle unauthenticated access
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Prevent authenticated users from accessing auth pages
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  // Role-based access control
  if (
    requireAuth &&
    effectiveAllowedRoles &&
    role &&
    !effectiveAllowedRoles.includes(role as UserRole)
  ) {
    // Redirect to fallback route based on role
    const fallbackRoutes: Partial<Record<UserRole, string>> = {
      [UserRole.ENGINEER]: '/app',
      [UserRole.TEAMLEAD]: '/app',
      [UserRole.COORDINATOR]: '/app/coordinator',
      [UserRole.ADMIN]: '/app',
      [UserRole.MANAGEMENT]: '/app/management',
      [UserRole.SYSTEM]: '/app/system',
    };

    const fallback = fallbackRoutes[role as UserRole] || '/app';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
