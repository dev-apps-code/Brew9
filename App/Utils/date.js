import Moment from 'moment';

const months = [
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
  'December'
];

// Get's month text based on index where Jan starts at index 0
export const month = (idx) => months[idx];

/**
 * Get Day from N where n can be positive of negative
 * i.e. getDayNFrom(new Date(), 1) // returns tomorrow's date
 *
 * @param {Date} from specific date
 * @param {number} n days from now
 * @returns {Date} from +/- n days
 */
export const getDayNFrom = (from, n) => from.setDate(from.getDay() + n);

/**
 * Check if time is within range
 * 
 * @param {string} time time
 * @param {string} start time
 * @param {string} end time
 */

export const isTimeWithin = (time, start, end) => {
  var format = 'hh:mm';
  var _time = Moment(time, format);
  var startTime = Moment(start, format);
  var endTime = Moment(end, format);

  return _time.isBetween(startTime, endTime);
};