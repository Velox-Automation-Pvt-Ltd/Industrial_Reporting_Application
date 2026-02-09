import React, { useState } from 'react';
import { User, Mail, Phone, Building, Edit3, Save, X, CheckCircle } from 'lucide-react';
import { UserType } from 'src/types/auth/auth';
import { capitalizeFirstLetter } from 'src/utils/CapitalizeFirstLetter';
import { Navigate, useNavigate } from 'react-router';

interface ProfileInfoProps {
  user: UserType;
  onUpdate: (user: any) => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    onUpdate(editedUser);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const inputClasses =
    'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm ';

  const labelClasses = 'flex items-center gap-2 text-sm font-medium text-gray-700 mb-2';

  const firstName = user?.username?.split(' ')[0];
  const lastName = user?.username?.split(' ')[1];

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="flex items-center gap-3 p-6 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-green-700">Profile Updated Successfully</h3>
            <p className="text-sm text-gray-600">
              Your profile information has been saved and is up to date.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          {/* {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )} */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4" />
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setEditedUser((prev: any) => ({ ...prev, firstName: e.target.value }))
                }
                className={inputClasses}
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {firstName}
              </div>
            )}
          </div>

          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4" />
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser?.username}
                onChange={(e) =>
                  setEditedUser((prev: any) => ({ ...prev, lastName: e.target.value }))
                }
                className={inputClasses}
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {lastName}
              </div>
            )}
          </div>

          <div className="">
            <label className={labelClasses}>
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                disabled
                value={editedUser?.email}
                onChange={(e) => setEditedUser((prev: any) => ({ ...prev, email: e.target.value }))}
                className={inputClasses}
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                {user.email}
              </div>
            )}
          </div>

          {/* <div>
            <label className={labelClasses}>
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editedUser?.phone ?? ''}
                onChange={(e) => setEditedUser((prev: any) => ({ ...prev, phone: e.target.value }))}
                className={inputClasses}
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {user.phone}
              </div>
            )}
          </div> */}

          {/* <div>
            <label className={labelClasses}>
              <Building className="w-4 h-4" />
              Department
            </label>
            {isEditing ? (
              <select
                value={editedUser.department}
                onChange={(e) =>
                  setEditedUser((prev: any) => ({ ...prev, department: e.target.value }))
                }
                className={inputClasses}
              >
                <option value="Automation Engineering">Automation Engineering</option>
                <option value="Control Systems">Control Systems</option>
                <option value="Electrical Design">Electrical Design</option>
                <option value="Project Management">Project Management</option>
                <option value="Quality Assurance">Quality Assurance</option>
              </select>
            ) : (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {user.department}
              </div>
            )}
          </div> */}

          <div>
            <label className={labelClasses}>
              <Building className="w-4 h-4" />
              Role
            </label>
            {isEditing ? (
              <input
                disabled
                type="text"
                value={editedUser.role.roleName}
                onChange={(e) => setEditedUser((prev: any) => ({ ...prev, role: e.target.value }))}
                className={inputClasses}
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {capitalizeFirstLetter(user?.role?.roleName)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <button className="p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-left transition-all duration-200 hover:scale-105 group shadow-sm">
            <div className="text-blue-700 font-medium group-hover:text-blue-800">
              Download Profile Report
            </div>
            <div className="text-sm text-gray-600 mt-1">Export your profile data as PDF</div>
          </button> */}
          <button
            onClick={() => navigate('/my-schedule')}
            className="p-4 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg text-left transition-all duration-200 hover:scale-105 group shadow-sm"
          >
            <div className="text-cyan-700 font-medium group-hover:text-cyan-800">View Schedule</div>
            <div className="text-sm text-gray-600 mt-1">Check your upcoming Schedule</div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Account Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Profile Completion</span>
            <span className="text-blue-600 font-medium">100%</span>
          </div>
          {/* <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Two-Factor Authentication</span>
            <span className="text-yellow-600 font-medium">Not Enabled</span>
          </div> */}
          {/* <div className="flex justify-between py-2">
            <span className="text-gray-600">Data Export Available</span>
            <span className="text-green-600 font-medium">Yes</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
