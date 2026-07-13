import { addDays, format, startOfDay } from "date-fns";
import { BUSINESS_HOURS } from "./constants";

export type UpcomingDay = {
  date: Date;
  dateStr: string;
  weekdayShort: string;
  dayNum: string;
  monthShort: string;
  isOpen: boolean;
};

const WEEKDAY_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH_SHORT = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export function getUpcomingDays(count = 21): UpcomingDay[] {
  const today = startOfDay(new Date());
  const days: UpcomingDay[] = [];

  for (let i = 0; i < count; i++) {
    const date = addDays(today, i);
    days.push({
      date,
      dateStr: format(date, "yyyy-MM-dd"),
      weekdayShort: WEEKDAY_SHORT[date.getDay()],
      dayNum: format(date, "d"),
      monthShort: MONTH_SHORT[date.getMonth()],
      isOpen: Boolean(BUSINESS_HOURS[date.getDay()]),
    });
  }

  return days;
}
