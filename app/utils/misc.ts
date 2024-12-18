/* eslint-disable curly */
import {I18nManager, Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

export const isAndroid = Platform.OS === 'android' ? true : false;
export const MICROPHONE_PERMISSION = isAndroid
  ? PERMISSIONS.ANDROID.RECORD_AUDIO
  : PERMISSIONS.IOS.MICROPHONE;
export const isRTL = I18nManager.isRTL ? true : false;
export const UUID = () => {
  return Math.floor(Math.random() * Date.now());
};
export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const formatDate = (dob: Date) => {
  if (!dob || (dob instanceof Date && isNaN(dob.getTime()))) {
    return ' ';
  }
  const dateObj = new Date(dob);

  return `${
    MONTH_NAMES[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};
export const doctorReview = (review: number) => {
  if (review === 0 || !review) return '0 Review';
  if (review > 1) return `${review} Reviews`;
};
export const isDateValid = (dob: Date) => {
  const isValid = !dob || (dob instanceof Date && isNaN(dob.getTime()));

  return !isValid;
};

export const formatAMPM = (date: Date, withABV: boolean = true) => {
  if (date !== undefined && isDateValid(date) && date !== null) {
    let hours = date?.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12;

    const strTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}${
      withABV ? ' ' + ampm : ''
    }`;
    return strTime;
  }
};
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const formatTiming = (start: any, end: any) => {
  // const startTime = new Date(start.seconds * 1000);
  // const endTime = new Date(end.seconds * 1000);
  const startTime = new Date(start);
  const endTime = new Date(end);

  return `${formatAMPM(startTime)} - ${formatAMPM(endTime)}`;
};
export const startEndTime = (start: any, end: any) => {
  const startTime = new Date(start.seconds * 1000);
  const endTime = new Date(end.seconds * 1000);

  return `${formatAMPM(startTime)} - ${formatAMPM(endTime)}`;
};

export const timelineTiming = (start: any, end: any) => {
  // const startTime = new Date(start.seconds * 1000);
  // const endTime = new Date(end.seconds * 1000);
  const startTime = new Date(start);
  const endTime = new Date(end);

  return `${formatAMPM(startTime, false)} - ${formatAMPM(endTime, false)}`;
};
export function delay(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
export function availabilityInfo(type: string, doctorsName: string) {
  //DAYS ==> WEEKDAYS ONLY
  //ENDS ==> WEEKENDS ONLY
  //ENTIRE ==>ENTIRE WEEK

  const prefix = `Dr. ${doctorsName}`;
  if (type.includes('days')) {
    return `${prefix} is available only on weekdays, Monday to Friday. Find a date that works best for you!`;
  } else if (type.includes('ends')) {
    return `${prefix} is available only on weekends. You can book an appointment on Saturday or Sunday at your convenience.`;
  } else if (type.includes('Entire')) {
    return `${prefix} is available every day of the week, ensuring flexibility for your appointment. Explore the schedule to find a suitable time.`;
  } else if (type.includes('/')) {
    return `${prefix} has specific days for appointments. Check the calendar to find the best date for your visit!"`;
  }
}

export const availableDays = (dateRange: string, customRange: boolean) => {
  let startingDate = new Date();
  const year = new Date().getFullYear();
  let endOfTheYear = `${year}-12-31`;
  let maxDate = new Date(endOfTheYear);
  let type: 'days' | 'ends' | 'entire' | undefined;
  if (customRange) {
    startingDate = new Date(dateRange.split('/')[0]);
    maxDate = new Date(dateRange.split('/')[1]);
  } else if (dateRange.includes('days')) {
    type = 'days';
  } else if (dateRange.includes('ends')) {
    type = 'ends';
  } else if (dateRange.includes('Entire')) {
    type = 'entire';
  }
  return {startingDate, maxDate, type};
};

export const getDisabledWeekendDates = (year: number) => {
  const disabledDates = [];
  const date = new Date(year, 0, 1); // Start from January 1st

  while (date.getFullYear() === year) {
    const day = date.getDay();
    if (day === 1 || day === 0) {
      const formattedDate = date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      disabledDates.push(formattedDate);
    }
    date.setDate(date.getDate() + 1); // Move to the next day
  }

  return disabledDates;
};

export const getDisabledWeekdayDates = (year: number) => {
  const disabledDates = [];
  const date = new Date(year, 0, 1); // Start from January 1st

  while (date.getFullYear() === year) {
    const day = date.getDay();
    if (day === 2 || day === 3 || day === 4 || day === 5 || day === 6) {
      const formattedDate = date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      disabledDates.push(formattedDate);
    }
    date.setDate(date.getDate() + 1); // Move to the next day
  }

  return disabledDates;
};
