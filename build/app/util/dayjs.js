import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import duration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/pt-br.js';
export const regexMonthAndYear = new RegExp(/^[0-9]{2}\/[0-9]{4}/);
export const regexYearAndMonth = new RegExp(/^[0-9]{4}\/[0-9]{2}/);
export const regexDayMonthAndYear = new RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);
export const regexHoursMinutesSeconds = new RegExp(/[0-9]{2}:[0-9]{2}:[0-9]{2}/);
export const regexYearMonthAndDay = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
const dayjsParseDateCustomPlugin = () => {
    dayjs.prototype.customParse = function (date) {
        if (!date || date === 'null' || date === '' || date === 'undefined') {
            return null;
        }
        if (date instanceof Date) {
            return date;
        }
        if (typeof (date) === 'number') {
            return dayjs.tz(date);
        }
        if (regexYearMonthAndDay.test(date)) {
            return dayjs(date);
        }
        if (regexMonthAndYear.test(date)) {
            let string = 'MM/YYYY';
            if (regexHoursMinutesSeconds.test(date)) {
                string += ' HH:mm:ss';
            }
            return dayjs(date, string);
        }
        if (regexYearAndMonth.test(date)) {
            let string = 'MM/YYYY';
            if (regexHoursMinutesSeconds.test(date)) {
                string += ' HH:mm:ss';
            }
            return dayjs(date, string);
        }
        if (regexDayMonthAndYear.test(date)) {
            let string = 'DD/MM/YYYY';
            if (regexHoursMinutesSeconds.test(date)) {
                string += ' HH:mm:ss';
            }
            return dayjs(date, string);
        }
        console.warn(`Date not recognized: ${date}`);
        return date;
    };
    dayjs.customParse = dayjs.prototype.customParse;
};
dayjs.extend(dayjsParseDateCustomPlugin);
export default dayjs;
//# sourceMappingURL=dayjs.js.map