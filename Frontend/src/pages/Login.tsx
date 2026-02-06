import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login({ username, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center" 
      style={{ backgroundColor: 'var(--theme-color-std-bkg)' }}
    >
      <div 
        className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg" 
        style={{ backgroundColor: 'var(--theme-color-component-1)' }}
      >
        <div>
          <h2 
            className="text-center text-3xl font-extrabold" 
            style={{ color: 'var(--theme-color-std-text)' }}
          >
            AerialView Modern
          </h2>
          <p 
            className="mt-2 text-center text-sm" 
            style={{ color: 'var(--theme-color-soft-text)' }}
          >
            Industrial Reporting System
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div 
              className="px-4 py-3 rounded" 
              style={{ 
                backgroundColor: 'var(--theme-color-alarm)', 
                color: 'var(--theme-color-inv-contrast-text)',
                border: '1px solid var(--theme-color-alarm-bdr)'
              }}
            >
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium" 
                style={{ color: 'var(--theme-color-std-text)' }}
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  backgroundColor: 'var(--theme-color-input-bkg)',
                  border: '1px solid var(--theme-color-soft-bdr)',
                  color: 'var(--theme-color-std-text)',
                }}
              />
            </div>
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium" 
                style={{ color: 'var(--theme-color-std-text)' }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: 'var(--theme-color-input-bkg)',
                  border: '1px solid var(--theme-color-soft-bdr)',
                  color: 'var(--theme-color-std-text)',
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
              style={{
                backgroundColor: 'var(--theme-color-primary)',
                color: 'var(--theme-color-inv-contrast-text)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div 
            className="text-sm text-center" 
            style={{ color: 'var(--theme-color-soft-text)' }}
          >
            <p>Default credentials:</p>
            <p className="font-mono">Username: admin</p>
            <p className="font-mono">Password: admin@321</p>
          </div>
        </form>
      </div>
    </div>
  );
}
