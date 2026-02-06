import { useState } from 'react';
import authService from '../services/authService';
import { Save } from 'lucide-react';

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setMessage('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--theme-color-std-text)' }}>
          Settings
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--theme-color-soft-text)' }}>
          Manage your account settings
        </p>
      </div>

      <div 
        className="shadow sm:rounded-lg" 
        style={{ backgroundColor: 'var(--theme-color-component-1)' }}
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 
            className="text-lg font-medium leading-6" 
            style={{ color: 'var(--theme-color-std-text)' }}
          >
            Change Password
          </h3>
          <div 
            className="mt-2 max-w-xl text-sm" 
            style={{ color: 'var(--theme-color-soft-text)' }}
          >
            <p>Update your password to keep your account secure.</p>
          </div>

          <form onSubmit={handleChangePassword} className="mt-5 sm:flex sm:flex-col sm:space-y-4">
            {message && (
              <div 
                className="px-4 py-3 rounded"
                style={{
                  backgroundColor: 'var(--theme-color-success)',
                  color: 'var(--theme-color-inv-contrast-text)',
                  border: '1px solid var(--theme-color-success)',
                }}
              >
                {message}
              </div>
            )}
            {error && (
              <div 
                className="px-4 py-3 rounded"
                style={{
                  backgroundColor: 'var(--theme-color-alarm)',
                  color: 'var(--theme-color-inv-contrast-text)',
                  border: '1px solid var(--theme-color-alarm-bdr)',
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label 
                htmlFor="current-password" 
                className="block text-sm font-medium" 
                style={{ color: 'var(--theme-color-std-text)' }}
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                className="mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 sm:text-sm"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{
                  backgroundColor: 'var(--theme-color-input-bkg)',
                  border: '1px solid var(--theme-color-soft-bdr)',
                  color: 'var(--theme-color-std-text)',
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="new-password" 
                className="block text-sm font-medium" 
                style={{ color: 'var(--theme-color-std-text)' }}
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 sm:text-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  backgroundColor: 'var(--theme-color-input-bkg)',
                  border: '1px solid var(--theme-color-soft-bdr)',
                  color: 'var(--theme-color-std-text)',
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="confirm-password" 
                className="block text-sm font-medium" 
                style={{ color: 'var(--theme-color-std-text)' }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  backgroundColor: 'var(--theme-color-input-bkg)',
                  border: '1px solid var(--theme-color-soft-bdr)',
                  color: 'var(--theme-color-std-text)',
                }}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: 'var(--theme-color-primary)',
                  color: 'var(--theme-color-inv-contrast-text)',
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
