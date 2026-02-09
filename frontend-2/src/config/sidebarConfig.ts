export const SidebarPermissionData = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'solar:widget-add-line-duotone',
    url: '/app',
    roles: ['ADMIN'], // 'COORDINATOR', 'ADMIN', 'MANAGEMENT', 'SYSTEM'
    children: [],
  },
  {
    id: 2,
    name: 'My Schedule',
    icon: 'solar:user-bold-duotone',
    url: '/app/my-schedule',
    roles: [],
    children: [],
  },

  {
    id: 3,
    name: 'Database',
    icon: 'solar:database-linear',
    url: '/app/database-management',
    roles: ['ADMIN'],
    children: [],
  },
  {
    id: 4,
    name: 'Team Schedule',
    icon: 'solar:settings-bold-duotone',
    url: '/app/team-schedule',
    roles: ['ENGINEER', 'TEAMLEAD'], //, 'COORDINATOR'
    children: [],
  },
  {
    id: 5,
    name: 'Report',
    icon: 'solar:settings-bold-duotone',
    url: '/app/reports',
    roles: [], // TEAMLEAD 'COORDINATOR', 'ADMIN'
    children: [],
  },
  {
    id: 6,
    name: 'Administration',
    icon: 'solar:settings-bold-duotone',
    url: '/app/report',
    roles: [], //'ADMIN','SYSTEM', 'COORDINATOR'
    children: [
      {
        id: 7,
        name: 'System Settings',
        icon: 'solar:settings-bold-duotone',
        url: '/app/system',
        roles: ['SYSTEM'],
        children: [],
      },
      {
        id: 8,
        name: 'Management',
        icon: 'solar:chart-bold-duotone',
        url: '/app/management',
        roles: ['MANAGEMENT', 'ADMIN'],
        children: [],
      },
    ],
  },
  {
    id: 9,
    name: 'Team Management by Coordinator',
    icon: 'solar:users-group-rounded-bold',
    url: '/app/team-management-by-coordinator',
    roles: [], // 'COORDINATOR', 'ADMIN'
    children: [],
  },
  {
    id: 10,
    name: 'Project Master',
    icon: 'solar:database-linear',
    url: '/app/master/projects',
    roles: [], // , 'TEAMLEAD' 'COORDINATOR', 'ADMIN'
    children: [],
  },
  {
    id: 11,
    name: 'Service Master',
    icon: 'solar:server-minimalistic-broken',
    url: '/app/master/services',
    roles: [], // 'COORDINATOR', 'ADMIN'
    children: [],
  },

  {
    id: 12,
    name: 'Reports',
    icon: 'solar:document-bold-duotone',
    url: '/app/reports',
    roles: ['ADMIN'], // 'COORDINATOR', 'ADMIN'
    children: [],
  },
  {
    id: 5,
    name: 'Settings',
    icon: 'solar:settings-bold-duotone',
    url: '/app/settings',
    roles: ['ADMIN'], // TEAMLEAD 'COORDINATOR', 'ADMIN'
    children: [],
  },
  {
    id: 13,
    name: 'AMC Master',
    icon: 'solar:ferris-wheel-broken',
    url: '/app/master/amc',
    roles: [], // 'COORDINATOR', 'ADMIN'
    children: [],
  },
  {
    id: 14,
    name: 'User Management',
    icon: 'solar:user-bold-duotone',
    url: '/app/user-management',
    roles: [],
    children: [],
  },
];
