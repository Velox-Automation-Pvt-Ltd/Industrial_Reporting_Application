import { UserRole } from '..';

export interface MenuItem {
  id: number;
  name: string;
  icon: string;
  url: string;
  roles?: UserRole[];
  children?: MenuItem[];
}

export interface MenuResponse {
  success: boolean;
  data: MenuItem[];
}
