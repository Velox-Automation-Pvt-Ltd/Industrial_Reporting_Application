export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?: boolean;
}

import { uniqueId } from 'lodash';

import { UserRole } from 'src/types';

interface MenuItem {
  name: string;
  icon: string;
  id: string;
  url: string;
  roles?: UserRole[]; // Optional - if undefined, menu is visible to all roles
  children?: MenuItem[];
}

interface MenuGroup {
  heading: string;
  roles?: UserRole[]; // Optional - if undefined, group is visible to all roles
  children: MenuItem[];
}

const SidebarContent: MenuGroup[] = [
  {
    heading: 'Home',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-add-line-duotone',
        id: uniqueId(),
        url: '/app',
      },
      {
        name: 'My Schedule',
        icon: 'solar:user-bold-duotone',
        id: uniqueId(),
        url: '/app/my-schedule',
        roles: [UserRole.ENGINEER, UserRole.TEAMLEAD],
      },
      {
        name: 'Team Schedule',
        icon: 'solar:settings-bold-duotone',
        id: uniqueId(),
        url: '/app/team-schedule',
        roles: [UserRole.ENGINEER, UserRole.TEAMLEAD, UserRole.COORDINATOR, UserRole.ADMIN],
      },
    ],
  },
  {
    heading: 'Administration',
    roles: [UserRole.ADMIN, UserRole.SYSTEM, UserRole.COORDINATOR],
    children: [
      {
        name: 'System Settings',
        icon: 'solar:settings-bold-duotone',
        id: uniqueId(),
        url: '/app/system',
        roles: [UserRole.SYSTEM],
      },
      {
        name: 'Management',
        icon: 'solar:chart-bold-duotone',
        id: uniqueId(),
        url: '/app/management',
        roles: [UserRole.MANAGEMENT, UserRole.ADMIN],
      },
      {
        name: 'Coordinator Panel',
        icon: 'solar:users-group-two-rounded-bold-duotone',
        id: uniqueId(),
        url: '/app/coordinator',
        roles: [UserRole.COORDINATOR],
      },
    ],
  },
];

export default SidebarContent;
