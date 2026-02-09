const getRowColors = (row: any): string => {
  const isLeave = row.locationId?.toLowerCase() === 'leave';
  if (isLeave) {
    return 'bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all';
  }

  if (row.isChargeable === true) {
    return 'bg-green-100 text-green-800 hover:bg-green-200 transition-all';
  }

  if (row.isChargeable === false) {
    return 'bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all';
  }

  return '';
};

export default getRowColors;

export const getRowColorsForAttendence = (row: any): string => {
  const isAbove60 = row >= 60;
  if (isAbove60) {
    return 'bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all';
  }

  if (row.isChargeable === false) {
    return 'bg-green-100 text-green-800 hover:bg-green-200 transition-all';
  }

  if (row.isChargeable === false) {
    return 'bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all';
  }

  return '';
};

export const getRowColorsForUserManagemnt = (row: any): string => {
  const inactive = row.isActive === false;
  const isActive = row.isActive === true;
  if (inactive) {
    return 'bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all';
  }

  if (isActive) {
    return 'bg-green-100 text-green-800 hover:bg-green-200 transition-all';
  }

  if (row.isChargeable === false) {
    return 'bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all';
  }

  return '';
};
