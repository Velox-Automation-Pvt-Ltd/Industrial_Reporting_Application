import React, { useState } from 'react';
import { Camera, Shield, Clock, MapPin } from 'lucide-react';
import { UserType } from 'src/types/auth/auth';
import user5 from '/src/assets/images/profile/user-5.jpg';
import { capitalizeFirstLetter } from 'src/utils/CapitalizeFirstLetter';
interface ProfileHeaderProps {
  user: UserType;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const [imageError, setImageError] = useState(false);

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const firstName = user?.username?.split(' ')[0];
  const lastName = user?.username?.split(' ')[1];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-left transition-all duration-200 hover:scale-105 group p-8 shadow-sm">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div> */}

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Picture */}
          <div className="relative group-hover:scale-105 transition-all duration-200">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl">
              {imageError ? (
                <div className="w-full h-full text-orange-700 group-hover:text-orange-800 flex items-center justify-center bg-orange-200 group-hover:bg-orange-100 rounded-full text-3xl font-bold">
                  {firstName}
                  {lastName}
                </div>
              ) : (
                <img
                  src={user5}
                  alt={`${user?.username || ''}`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 group-hover:scale-110">
              <Camera className="w-5 h-5 text-orange-300" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">{user?.username}</h1>
            <p className="text-xl text-secondary mb-1">
              {capitalizeFirstLetter(user?.role?.roleName)}
            </p>
            <p className="text-sm text-[#5b83acbb] mb-4">Velox Automation</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-[#0d355c41]">
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4" />
                <span>ID: {user?.userId}</span>
              </div>
              {/* <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span>Last login: {formatLastLogin(user.lastLogin)}</span>
              </div> */}
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  true ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-200'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${true ? 'bg-green-600' : 'bg-red-400'}`}
                ></div>
                <span>{true ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
