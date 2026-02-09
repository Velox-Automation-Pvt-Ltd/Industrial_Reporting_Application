import { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks/reduxHooks';
import FullLayout from 'src/layouts/full/FullLayout';
import { UserRole } from 'src/types';
import ProtectedRoute from './ProtectedRoute';
import { Outlet, RouterProvider } from 'react-router';
import AppErrorBoundary from 'src/pages/Error/ErrorPage';
import ProjectMasterSummaryModal from 'src/components/modal/ProjectMasterSummary';
import Loader from 'src/components/Loaders/Loader';
import Reports from 'src/pages/Reports/Reports';
import Settings from 'src/pages/Settings/Settings';
import DatabaseManagement from 'src/pages/DatabaseManagement/DatabaseManagement';

// Team Leaders
const AmcMaster = lazy(() => import('src/pages/Coordinator/AmcMaster'));
const ServiceMaster = lazy(() => import('src/pages/Coordinator/ServiceMaster'));
const ProjectMaster = lazy(() => import('src/pages/Coordinator/ProjectMaster'));

const EmployeeAttendenceSummary = lazy(() => import('src/pages/common/EmployeeAttendenceSummary'));
const TeamManagement = lazy(() => import('src/pages/TeamLead/TeamManagement'));
const TeamManagementByCoordinator = lazy(
  () => import('src/pages/Coordinator/TeamManagementByCoordinator'),
);

const UserManagement = lazy(() => import('src/pages/Admin/UserManagement'));
const Profile = lazy(() => import('src/pages/common/Profile'));
const TeamSchedule = lazy(() => import('src/pages/common/TeamSchedule'));
const Report = lazy(() => import('src/pages/common/Report'));
const MySchedule = lazy(() => import('src/pages/Engineer/MySchedule'));
const SignIn = lazy(() => import('@/pages/auth/SignIn'));
const SignUp = lazy(() => import('@/pages/auth/SignUp'));
const SystemAdminPanel = lazy(() => import('@/pages/Engineer/EngineerDashboard'));
const CoordinatorView = lazy(() => import('@/pages/Engineer/EngineerDashboard'));

// Role-specific dashboards
const EngineerDashboard = lazy(() => import('@/pages/Engineer/EngineerDashboard'));
const TeamLeadDashboard = lazy(() => import('@/pages/Engineer/EngineerDashboard'));
const AdminDashboard = lazy(() => import('@/pages/Admin/AdminDashboard'));
const CoordinatorDashboard = lazy(() => import('@/pages/Coordinator/CoordinatorDashboard'));
const ManagementDashboard = lazy(() => import('src/pages/Management/ManagementDashboard'));
const SystemDashboard = lazy(() => import('@/pages/Engineer/EngineerDashboard'));

// Loading component
export const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-transparent">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      {/* <Loader /> */}
      <p className="mt-4 text-lg font-medium">Loading...</p>
    </div>
  </div>
);

// Role-specific dashboard resolver :

const RoleSpecificDashboard = () => {
  const role = useAppSelector((state) => state.auth.user?.role);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* {role === UserRole.ENGINEER && <EngineerDashboard />}
      {role === UserRole.TEAMLEAD && <TeamLeadDashboard />}
      {role === UserRole.ADMIN && <AdminDashboard />}
      {role === UserRole.COORDINATOR && <CoordinatorDashboard />}
      {role === UserRole.MANAGEMENT && <ManagementDashboard />}
      {role === UserRole.SYSTEM && <SystemDashboard />}
      {!role && <Navigate to="/login" replace />} */}
      <AdminDashboard />
    </Suspense>
  );
};

const AppRouter = () => {
  const isAuthenticated = useAppSelector((s) => !!s.auth.accessToken);
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    const routes = [
      {
        path: '/',
        element: (
          <AppErrorBoundary>
            <Navigate to={isAuthenticated ? '/app' : '/login'} replace />
          </AppErrorBoundary>
        ),
      },
      {
        path: '/login',
        element: (
          <AppErrorBoundary>
            <ProtectedRoute requireAuth={false}>
              <SignIn />
            </ProtectedRoute>
          </AppErrorBoundary>
        ),
      },
      {
        path: '/register',
        element: (
          <AppErrorBoundary>
            <ProtectedRoute requireAuth={false}>
              <SignUp />
            </ProtectedRoute>
          </AppErrorBoundary>
        ),
      },
      {
        path: '/app',
        element: (
          <AppErrorBoundary>
            <ProtectedRoute requireAuth={true}>
              <FullLayout />
            </ProtectedRoute>
          </AppErrorBoundary>
        ),
        children: [
          {
            index: true,
            element: <RoleSpecificDashboard />,
          },

          {
            path: 'reports',
            element: (
              <AppErrorBoundary>
                <Suspense fallback={<LoadingScreen />}>
                  <Reports />
                </Suspense>
              </AppErrorBoundary>
            ),
            allowedRoles: [UserRole.ADMIN],
          },
          {
            path: 'settings',
            element: (
              <AppErrorBoundary>
                <Suspense fallback={<LoadingScreen />}>
                  <Settings />
                </Suspense>
              </AppErrorBoundary>
            ),
            allowedRoles: [UserRole.COORDINATOR],
          },
          {
            path: 'database-management',
            element: (
              <AppErrorBoundary>
                <Suspense fallback={<LoadingScreen />}>
                  <DatabaseManagement />
                </Suspense>
              </AppErrorBoundary>
            ),
            allowedRoles: [UserRole.COORDINATOR],
          },

          {
            path: 'profile',
            element: (
              <AppErrorBoundary>
                <Suspense fallback={<LoadingScreen />}>
                  <Profile />
                </Suspense>
              </AppErrorBoundary>
            ),
            allowedRoles: [UserRole.MANAGEMENT],
          },
          {
            path: '*',
            element: <Navigate to="/app" replace />,
          },
          // {
          //   path: '*',
          //   element: <NotFoundPage />,
          // },
        ],
      },
      {
        path: '*',
        element: isAuthenticated ? (
          <Navigate to="/app" replace />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
    ];

    setRouter(createBrowserRouter(routes));
  }, [isAuthenticated]);

  if (!router) return <LoadingScreen />;

  return <RouterProvider router={router} />;
};

export default AppRouter;
