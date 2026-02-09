import { VITE_SERVER_URL } from '@/config/env';
import store from '@/store/store';
import axios from 'axios';
import toast from 'react-hot-toast';
import { handleLogout } from 'src/actions/Auth/authAction';
import { setAccessToken, setlogout } from 'src/store/slices/authSlice';
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";

export const http = axios.create({
  baseURL: VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// for Request from API endpoint
http.interceptors.request.use(
  async (config) => {
    // const token = Cookies.get("access_token");
    const state = store.getState();
    const { accessToken } = state.auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      // config.headers['x-authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// for response

http.interceptors.response.use(
  (response) => {
    // Handle successful response here
    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Cookies.remove("access_token");
      const state = store.getState();
      const { refreshToken } = state.auth;
      try {
        const response = await axios.post(
          `${VITE_SERVER_URL}auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              // 'x-authorization': `Bearer ${refreshToken}`,
            },
            withCredentials: true,
          },
        );
        const newAccessToken = response.data.accessToken;
        store.dispatch({ type: 'auth/setAccessToken', payload: newAccessToken });
        store.dispatch(setAccessToken(newAccessToken));
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return http.request(error.config);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        store.dispatch({ type: 'auth/logout' });
        handleLogout();
        toast.error('Session expired. Please log in again.');
      }

      console.log('Error : ', error.response?.data?.message || 'An error occurred in api');
      // toast.error("Session expired");
    }
    return Promise.reject(error);
  },
);
