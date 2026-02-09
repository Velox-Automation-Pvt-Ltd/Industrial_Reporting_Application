import { format } from 'date-fns';
import { MapPin } from 'lucide-react';

export const getFormattedSchedule = (raw: any) => {
  if (!raw) return null;

  return {
    date: format(new Date(raw.scheduleDate), 'EEEE, MMMM d, yyyy'),
    schedule: {
      location: raw.location?.locationName || 'Unknown Location',
      category: raw.isChargeable ? 'Chargeable' : 'Non-Chargeable',
      project: `${raw.project?.projectNo || '---'}`,
      status: formatStatus(raw.status),
      description: getDescription(raw),
      icon: MapPin,
      iconColor: getIconColor(raw.location?.locationName),
    },
  };
};

// Helper to make status more readable
const formatStatus = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return 'Scheduled';
    case 'APPROVED':
      return 'Approved';
    case 'COMPLETED':
      return 'Completed';
    default:
      return 'Scheduled';
  }
};

// Fallback if no description
const getDescription = (raw: any) => {
  return raw.description || raw.work?.workName || 'No description provided';
};

const getIconColor = (location: string) => {
  switch (location?.toLowerCase()) {
    case 'site':
      return 'text-blue-500';
    case 'office':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};
