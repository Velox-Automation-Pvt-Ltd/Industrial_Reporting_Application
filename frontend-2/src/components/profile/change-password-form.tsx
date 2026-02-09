import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useChangePasswordMutation } from 'src/api/mutations/auth/useSignInMutation';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { changePasswordType } from 'src/types/auth/auth';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordChange = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'text-red-600';
    if (strength < 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Old password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (passwordStrength(passwordData.newPassword) < 3) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = 'New password must be different from Old password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  // const user = userDetails ?? [];

  const { mutate: changePasswordCall, isPending: isLoading } = useChangePasswordMutation({
    onSuccess: (data: any) => {
      toast.success(data || 'Password changed successfully!');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data: changePasswordType = {
      email: userDetails?.email,
      oldPassword: passwordData?.currentPassword,
      newPassword: passwordData?.confirmPassword,
    };

    changePasswordCall(data);
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const inputClasses =
    'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12 shadow-sm';
  const errorClasses = 'text-red-600 text-sm mt-1';

  const strength = passwordStrength(passwordData.newPassword);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-700" />
        <h2 className="text-blue-700 font-medium text-xl">Change Password</h2>
      </div>

      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl animate-fade-in">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-green-700">Password Updated Successfully</h3>
            <p className="text-sm text-gray-600">
              Your password has been changed. Please use your new password for future logins.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Lock className="w-4 h-4" />
            Old Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))
              }
              className={inputClasses}
              placeholder="Enter your old password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.currentPassword && <p className={errorClasses}>{errors.currentPassword}</p>}
        </div>

        {/* New Password */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Lock className="w-4 h-4" />
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))
              }
              className={inputClasses}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.newPassword && <p className={errorClasses}>{errors.newPassword}</p>}

          {/* Password Strength Indicator */}
          {passwordData.newPassword && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600">Password Strength:</span>
                <span className={`text-sm font-medium ${getStrengthColor(strength)}`}>
                  {getStrengthLabel(strength)}
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-full rounded-full transition-all duration-300 ${
                      i < strength
                        ? strength < 2
                          ? 'bg-red-500'
                          : strength < 4
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <div className={passwordData.newPassword.length >= 8 ? 'text-green-600' : ''}>
                  ✓ At least 8 characters
                </div>
                <div className={passwordData.newPassword.match(/[a-z]/) ? 'text-green-600' : ''}>
                  ✓ Lowercase letter
                </div>
                <div className={passwordData.newPassword.match(/[A-Z]/) ? 'text-green-600' : ''}>
                  ✓ Uppercase letter
                </div>
                <div className={passwordData.newPassword.match(/[0-9]/) ? 'text-green-600' : ''}>
                  ✓ Number
                </div>
                <div
                  className={passwordData.newPassword.match(/[^a-zA-Z0-9]/) ? 'text-green-600' : ''}
                >
                  ✓ Special character
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Lock className="w-4 h-4" />
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))
              }
              className={inputClasses}
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword}</p>}
        </div>

        {/* Security Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-blue-700 font-medium mb-2">Password Security Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Do not include your first name, last name, date of birth, or company name</li>
                <li>• At least 8 characters</li>
                <li>• Lowercase letter</li>
                <li>• Uppercase letter</li>
                <li>• Use a unique password you haven't used elsewhere</li>
                <li>• Include a mix of letters, numbers, and special characters</li>
                <li>• Consider using a password manager</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-lg"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Updating Password...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
