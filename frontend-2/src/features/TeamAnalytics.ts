import { GroupByScheduleType, Schedule, UserScheduleInTeam } from 'src/types/data';

export const getAnalytics = (data: GroupByScheduleType[]) => {
  const pendingSchedules: UserScheduleInTeam[] = [];
  const pendingApprovals: UserScheduleInTeam[] = [];

  const totalEmployees = data?.reduce((acc, group) => acc + group.users.length, 0) || 0;

  const officeUsers: UserScheduleInTeam[] = [];
  const siteUsers: UserScheduleInTeam[] = [];
  const siteAndOfficeUsers: UserScheduleInTeam[] = [];
  const leaveUsers: UserScheduleInTeam[] = [];

  data?.forEach((group: GroupByScheduleType) => {
    group?.users.forEach((user: UserScheduleInTeam) => {
      const schedule = user?.schedule;

      if (!schedule) {
        pendingSchedules.push(user);
        return;
      }

      if (schedule?.status?.toUpperCase() === 'PENDING') {
        pendingApprovals.push(user);
        return;
      }

      const locationName = schedule?.location?.locationName?.toLowerCase();

      switch (locationName.toLowerCase()) {
        case 'office':
          officeUsers.push(user);
          break;
        case 'site':
          siteUsers.push(user);
          break;
        case 'site + office':
          siteAndOfficeUsers.push(user);
          break;
        case 'leave':
          leaveUsers.push(user);
          break;
      }
    });
  });

  return {
    office: officeUsers?.length,
    officeUsers,
    site: siteUsers?.length,
    siteUsers,
    siteAndOffice: siteAndOfficeUsers?.length,
    siteAndOfficeUsers,
    leave: leaveUsers?.length,
    leaveUsers,
    pendingSchedulesCount: pendingSchedules.length,
    pendingApprovalsCount: pendingApprovals.length,
    pendingApprovalsUsers: pendingApprovals,
    pendingSchedulesUsers: pendingSchedules,
    totalEmployees,
  };
};
