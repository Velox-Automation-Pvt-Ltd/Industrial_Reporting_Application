import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from 'src/types';
import { UserType } from 'src/types/auth/auth';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken?: string | null;
  clientType?: string | null;
  userDetails: UserType | null;
  error?: string | null;
  loading: boolean;
  role: UserRole | String | null;
  activeDashboard?: string | null;
  sidebarMenus?: string | null;
}

const initialState: UserState = {
  user: null,
  userDetails: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  clientType: 'browser',
  error: null,
  loading: false,
  role: null,
  activeDashboard: null,
  sidebarMenus: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setloginSuccess(
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.role = action.payload.user.role;
    },
    setloginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setUserDetails(
      state,
      action: PayloadAction<{
        user: UserType;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) {
      state.userDetails = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.role = action.payload.user.role.roleName;
      state.refreshToken = action.payload.refreshToken;
    },

    setlogout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.role = null;
      state.userDetails = null;
    },

    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },

    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },

    setSidebarMenus(state, action: PayloadAction<string | null>) {
      state.sidebarMenus = action.payload;
    },

    setloading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setloginSuccess,
  setloginFailure,
  setlogout,
  setloading,
  setError,
  setAccessToken,
  setUserDetails,
  setIsAuthenticated,
} = userSlice.actions;

export default userSlice.reducer;
