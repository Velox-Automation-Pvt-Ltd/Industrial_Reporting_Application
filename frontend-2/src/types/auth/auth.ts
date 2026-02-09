import { User } from '..';

export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface signInType {
  title?: string;
}

export interface AuthStateProps {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface signUpRequestType {
  firstName: string;
  lastName: string;
  email: string;
  group: number | undefined;
  password: string;
  confirmPassword: string;
}

type Role = {
  roleId: number;
  roleName: string;
};

type Group = {
  groupId: number;
  groupName: string;
};

export type UserType = {
  userId?: number;
  username?: string;
  email?: string;
  role?: Role;
  empCode?: string | null;
  group?: Group;
  isEngineer?: boolean;
  isTeamLead?: boolean;
  isCoordinator?: boolean;
  isAdmin?: boolean;
  isManagement?: boolean;
  isSystem?: boolean;
  isActive?: boolean;
};

export type RegisterResponse = {
  message: string;
  apiVersion: string;
  user: UserType;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
};

export interface changePasswordType {
  email?: string;
  oldPassword: string;
  newPassword: string;
}

export interface refreshTokenType {
  refreshToken: string;
}
