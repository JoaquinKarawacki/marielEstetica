import { addMinutes, isBefore, isEqual, setHours, setMinutes, startOfDay } from "date-fns";
import { BUSINESS_HOURS, SLOT_STEP_MIN } from "./constants";

export type ExistingBooking = { date: Date; durationMin: number };

function timeStringToDate(day: Date, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  return setMinutes(setHours(startOfDay(day), h), m);
}

function rangesOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return isBefore(aStart, bEnd) && isBefore(bStart, aEnd);
}

/**
 * Generates the list of bookable start times ("HH:mm") for a given day and
 * service duration, excluding slots that collide with existing bookings or
 * fall outside business hours. `now` is injected for deterministic same-day
 * cutoffs (a booking must start at least `minLeadMin` from now).
 */
export function getAvailableSlots({
  day,
  durationMin,
  existingBookings,
  isBlocked,
  now = new Date(),
  minLeadMin = 60,
}: {
  day: Date;
  durationMin: number;
  existingBookings: ExistingBooking[];
  isBlocked: boolean;
  now?: Date;
  minLeadMin?: number;
}): string[] {
  if (isBlocked) return [];

  const weekday = day.getDay();
  const hours = BUSINESS_HOURS[weekday];
  if (!hours) return [];

  const openTime = timeStringToDate(day, hours.start);
  const closeTime = timeStringToDate(day, hours.end);
  const earliestStart = addMinutes(now, minLeadMin);

  const slots: string[] = [];
  let cursor = openTime;

  while (isBefore(cursor, closeTime) || isEqual(cursor, closeTime)) {
    const slotEnd = addMinutes(cursor, durationMin);
    if (isBefore(closeTime, slotEnd)) break;

    const isPast = isBefore(cursor, earliestStart);
    const collides = existingBookings.some((b) =>
      rangesOverlap(cursor, slotEnd, b.date, addMinutes(b.date, b.durationMin))
    );

    if (!isPast && !collides) {
      slots.push(
        `${String(cursor.getHours()).padStart(2, "0")}:${String(cursor.getMinutes()).padStart(2, "0")}`
      );
    }

    cursor = addMinutes(cursor, SLOT_STEP_MIN);
  }

  return slots;
}

export function combineDateAndTime(day: Date, time: string): Date {
  return timeStringToDate(day, time);
}
