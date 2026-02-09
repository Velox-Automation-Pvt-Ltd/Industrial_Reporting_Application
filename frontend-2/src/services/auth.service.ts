import { http } from '@/api/apiClient';
import { changePasswordType } from 'src/types/auth/auth';

class authService {
  Login(body: { email: string; username: string; password: string }) {
    return http.post('auth/login', body);
  }
  Register(requestData: any) {
    return http.post('auth/sign-up', requestData);
  }
  refreshAccessToken(request: any) {
    return http.post(`auth/refresh-token`, request);
  }
  Logout() {
    return http.post('auth/logout');
  }
  getUser() {
    return http.get('auth/user');
  }
  getUserById(id: number) {
    return http.get(`users/${id}`);
  }
  getUsersByGroupId(id: number) {
    return http.get(`users/group/${id}`);
  }
  getAllGroups() {
    return http.get('auth/groups');
  }
  fetchAllActiveUsers() {
    return http.get('users/active');
  }
  changePassword(body: changePasswordType) {
    return http.post('auth/change-password', body);
  }
  resetPassword(body: any) {
    return http.post('auth/reset-password', body);
  }
  getAllUsers() {
    return http.get('users');
  }
  updateUser(id: number | undefined, body: any) {
    return http.patch(`users/${id}`, body);
  }
}

export default new authService();
