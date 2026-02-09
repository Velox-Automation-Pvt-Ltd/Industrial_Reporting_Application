// import { useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from 'src/store/hooks/reduxHooks';
// import { isTokenExpired } from './authUtils';
// import { useEffect } from 'react';
// import { handleLogout } from 'src/actions/Auth/authAction';
// import toast from 'react-hot-toast';

// export const AuthWatcher = () => {
//   const { accessToken } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isTokenExpired(accessToken)) {
//       handleLogout(dispatch, navigate);
//       toast.error('Your Current session has been Expired, please re-login');
//       navigate('/login');
//     }
//   }, [accessToken]);

//   return null;
// };
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/reduxHooks';
import { isTokenExpired } from './authUtils';
import { useEffect } from 'react';
import { handleLogout, letsRefreshAccessToken } from 'src/actions/Auth/authAction';
import toast from 'react-hot-toast';
import { setAccessToken } from 'src/store/slices/authSlice'; // make sure you have this action

export const AuthWatcher = () => {
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const refreshAccessToken = async () => {
  //     try {
  //       const response = await letsRefreshAccessToken(refreshToken);
  //       console.log('lets refresh token in authwatcher response ::::', response);
  //       if (response?.accessToken) {
  //         dispatch(setAccessToken(response?.accessToken));
  //       } else {
  //         throw new Error('No access token in refresh response');
  //       }
  //     } catch (error) {
  //       console.error('Failed to refresh access token:', error);
  //       handleLogout();
  //       toast.error('Your session has expired, please log in again.');
  //       navigate('/login');
  //     }
  //   };

  //   if (isTokenExpired(accessToken)) {
  //     refreshAccessToken();
  //     // console.log('Token get refreshed in authwatcher ::::');
  //   }

  //   // Optionally: proactive refresh every 5–10 minutes
  //   const interval = setInterval(() => {
  //     if (isTokenExpired(accessToken)) {
  //       refreshAccessToken();
  //     }
  //   }, 5 * 60 * 1000); // every 5 min

  //   return () => clearInterval(interval);
  // }, [accessToken, dispatch, navigate]);

  return null;
};
