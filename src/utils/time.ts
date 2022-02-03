import moment from "moment";
import 'moment/locale/ru.js';

export function dateOutput(date: string): string {
  const orderTime = moment(new Date(date));
  orderTime.locale('ru');
  let outputDate: string = orderTime.calendar()+ ' i-GMT+3';

  return outputDate;
}