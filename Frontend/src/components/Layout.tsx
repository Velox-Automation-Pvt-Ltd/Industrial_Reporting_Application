import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import authService from '../services/authService';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-color-std-bkg)' }}>
      {/* Navigation */}
      <nav className="shadow-lg" style={{ backgroundColor: 'var(--theme-color-component-1)', borderBottom: '1px solid var(--theme-color-soft-bdr)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold" style={{ color: 'var(--theme-color-primary)' }}>
                  AerialView Modern
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'border-blue-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ 
                    color: isActive('/dashboard') 
                      ? 'var(--theme-color-primary)' 
                      : 'var(--theme-color-std-text)' 
                  }}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/reports"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/reports')
                      ? 'border-blue-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ 
                    color: isActive('/reports') 
                      ? 'var(--theme-color-primary)' 
                      : 'var(--theme-color-std-text)' 
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Reports
                </Link>
                <Link
                  to="/settings"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/settings')
                      ? 'border-blue-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ 
                    color: isActive('/settings') 
                      ? 'var(--theme-color-primary)' 
                      : 'var(--theme-color-std-text)' 
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-sm" style={{ color: 'var(--theme-color-std-text)' }}>
                Welcome, {user?.fullName || user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: 'var(--theme-color-primary)',
                  color: 'var(--theme-color-inv-contrast-text)',
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
