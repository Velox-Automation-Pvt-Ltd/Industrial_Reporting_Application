import dayjs from 'dayjs';

export const USER_LOCAL_STORAGE_KEY = 'user';
export const DASHBOARDS_LOCAL_STORAGE_KEY = 'dashboards';
export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'auth-token';
export const ACTIVE_DASHBOARD_LOCAL_STORAGE_KEY = 'activeDashboardId';
export const DEFAULT_DASHBOARD_NAME = 'My Dashboard';
export const ACCESS_TOKEN = 'access_token';

//constants Dates

export const tomorrowsDate = dayjs().add(1, 'day');
export const todaysDate = dayjs();
