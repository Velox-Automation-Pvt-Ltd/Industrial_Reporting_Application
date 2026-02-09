import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // If token is invalid, treat it as expired
  }
};
