import dayjs from 'dayjs';

export const formatDate = (value: any, format?: any) => {
  if (value) {
    return dayjs(value)
      .format(format ?? 'DD-MMM-YYYY hh:mm:ss A')
      .toUpperCase();
  } else {
    return '-';
  }
};
