import React, { useState } from 'react';
import ProfileHeader from 'src/components/profile/ProfileHeader';
import ProfileInfo from 'src/components/profile/Profile-info';
import PasswordChange from 'src/components/profile/change-password-form';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from 'src/actions/Auth/authAction';
import { useAppSelector } from 'src/store/hooks/reduxHooks';
import { RootState } from 'src/store/store';
import { UserType } from 'src/types/auth/auth';
import toast from 'react-hot-toast';
import { LoadingScreen } from 'src/routes/Routes';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const { user: userData } = useAppSelector((state: RootState) => state?.auth);

  const {
    data: user,
    isError,
    error,
    isLoading,
  } = useQuery<UserType>({
    queryKey: ['user', userData?.id],
    queryFn: () => getUserById(userData?.id as number),
  });

  const handleUserUpdate = (updatedUser: Partial<any>) => {
    // setUser((prev: any) => ({ ...prev, ...updatedUser }));
  };

  if (isError) return toast.error(error?.message || 'Server Error');

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user)
    return (
      <div className="text-red-500 text-xl text-center font-light font-sans">Server Error !</div>
    );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader user={user} />

        <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                activeTab === 'password'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Security Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'profile' && <ProfileInfo user={user} onUpdate={handleUserUpdate} />}
            {activeTab === 'password' && <PasswordChange />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
