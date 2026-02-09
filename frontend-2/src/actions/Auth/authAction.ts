import { USER_LOCAL_STORAGE_KEY } from '@/constant/constants';
import {
  setAccessToken,
  setloading,
  setloginSuccess,
  setlogout,
  setUserDetails,
} from '@/store/slices/authSlice';
import { persistor } from '@/store/store';
// import { UserRole } from '@/types/auth';
import authService from '@/services/auth.service';
import { UserRole } from 'src/types';
import { changePasswordType, refreshTokenType, signUpRequestType } from 'src/types/auth/auth';
import { fetchData } from 'src/utils/fetchAPIData';
import store from '@/store/store';
import toast from 'react-hot-toast';

export const signIn = async (email: string, password: string, dispatch: any) => {
  dispatch(setloading(true));
  const UserRes = await authService.Login({ email, username: email, password });
  const { token, refreshToken } = UserRes.data;
  await dispatch(setAccessToken(token));

  const { id, empCode, group, email: ResEmail, role, username, fullName } = UserRes.data.user;

  const user = UserRes?.data?.user ?? [];

  const sampleUserData = {
    id: 1,
    username: 'admin',
    email: 'admin@aerialview.com',
    fullName: 'Administrator',
    role: 'ADMIN',
    isActive: true,
    lastLoginAt: '2026-02-06T10:24:04.2092904Z',
    createdAt: '2026-02-05T17:25:14.887759',
  };

  let is_team_leader = false;
  if (role?.roleName === 'TEAMLEAD') {
    is_team_leader = true;
  }

  const userData = {
    user: {
      id: id,
      name: fullName || username,
      email: ResEmail,
      role: 'ADMIN',
      group_no: 0,
      employeeId: id,
      is_team_leader: false,
    },
    accessToken: token,
    refreshToken: refreshToken,
  };

  dispatch(setloginSuccess(userData));
  dispatch(setUserDetails({ user: user, accessToken: token, refreshToken: refreshToken }));
  dispatch(setloading(false));
  return userData;
};

export const signUp = async (requestData: signUpRequestType) => {
  const body = {
    username: requestData?.firstName + ' ' + requestData?.lastName,
    email: requestData?.email,
    password: requestData.confirmPassword,
    // empCode: 'VE006',
    roleName: 'ENGINEER',
    groupId: requestData?.group,
    isEngineer: true,
    isTeamLead: false,
    isCoordinator: false,
    isAdmin: false,
    isManagement: false,
  };

  const res = await authService.Register(body);
  return res.data;
};

export const letsRefreshAccessToken = async (request: any) => {
  try {
    const body = {
      refreshToken: request,
    };
    // const res = await authService.refreshAccessToken(body);
    // return res.data;
  } catch (error) {
    console.error('session error : ', error);
  }
};

export const signOut = async () => {
  const logoutRes = await authService.Logout();
  return logoutRes.data;
};

export const handleLogout = () => {
  store.dispatch(setlogout());
  persistor.purge();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = '/login';
};

export const getUserById = async (id: number) => {
  const res = await authService.getUserById(id);
  return res.data.data;
};

export const getAllGroups = async () => {
  const res = await authService.getAllGroups();
  return res.data;
};

export const changePassword = async (data: changePasswordType) => {
  const res = await authService.changePassword(data);
  return res.data;
};

export const fetchAllUsersInGroup = async (id: number) => {
  const res = await authService.getUsersByGroupId(id);
  return res?.data?.data;
};

export const fetchAllActiveUsers = async () => {
  const res = await authService.fetchAllActiveUsers();
  return res?.data?.data;
};

export const fetchAllUsers = async () => {
  const res = await authService.getAllUsers();
  return res?.data?.data;
};

export const updateUser = async (id: number | undefined, data: any) => {
  const res = await authService.updateUser(id, data);
  return res?.data;
};
