import { format, parseISO } from 'date-fns';

export const formatTime = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'h:mm a');
  } catch {
    return 'Unknown time';
  }
};

export const formatSnapshotDate = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    return {
      day: format(date, 'EEEE, MMM d'),
      time: format(date, 'h:mm a'),
    };
  } catch {
    return { day: 'Unknown date', time: '--' };
  }
};

export const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'EEEE, MMMM d');
  } catch {
    return 'Unknown date';
  }
};
