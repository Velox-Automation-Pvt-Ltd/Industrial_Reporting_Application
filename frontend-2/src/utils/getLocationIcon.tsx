import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const getLocationIcon = (location: string) => {
  switch (location) {
    case 'Site':
      return <MapPin className="h-3 w-3 text-blue-500" />;
    case 'Office':
      return <Briefcase className="h-3 w-3 text-green-500" />;
    case 'Leave':
      return <Calendar className="h-3 w-3 text-purple-500" />;
    case 'Site + Office':
      return <MapPin className="h-3 w-3 text-orange-500" />;
    default:
      return <Calendar className="h-3 w-3 text-gray-500" />;
  }
};
