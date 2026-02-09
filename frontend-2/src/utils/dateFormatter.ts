import { format } from 'date-fns';

export const formatDate = (isoDate: any) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const todaysDate = () => {
  return format(new Date(), 'EEEE, MMMM d, yyyy');
};
