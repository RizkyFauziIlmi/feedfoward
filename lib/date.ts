import { Event } from "@prisma/client";
import { differenceInMilliseconds, isAfter, isBefore } from "date-fns";

/**
 * Checks the event date against the current date.
 * @param startDate - The start date of the event.
 * @param endDate - The end date of the event.
 * @returns An object containing the status of the event date.
 */
export const checkEventDate = (startDate: Date, endDate: Date) => {
  const currentDate = new Date();
  const isOnGoing =
    isAfter(currentDate, startDate) && isBefore(currentDate, endDate);
  const isOver = isAfter(currentDate, endDate);
  const notComeYet = isBefore(currentDate, startDate);

  return {
    isOnGoing,
    isOver,
    notComeYet,
  }
};

/**
 * Sorts an array of events based on their status and proximity to the current date.
 * Ongoing events come first, followed by upcoming events, and then past events.
 * For events with the same status, they are sorted based on their startDate proximity to the current date.
 * @param events - The array of events to be sorted.
 * @returns The sorted array of events.
 */
export const sortingEvents = (events: Event[]) => {
    const sortedEvents = events.sort((a, b) => {
      const aIsOnGoing = isBefore(a.startDate, new Date()) && isAfter(a.endDate, new Date());
      const bIsOnGoing = isBefore(b.startDate, new Date()) && isAfter(b.endDate, new Date());
      const aIsUpcoming = isAfter(a.startDate, new Date());
      const bIsUpcoming = isAfter(b.startDate, new Date());
      const aIsOver = isBefore(a.endDate, new Date());
      const bIsOver = isBefore(b.endDate, new Date());

      if (aIsOnGoing && !bIsOnGoing) {
        return -1; // a is ongoing, b is not ongoing, so a should come first
      } else if (!aIsOnGoing && bIsOnGoing) {
        return 1; // b is ongoing, a is not ongoing, so b should come first
      } else if (aIsUpcoming && !bIsUpcoming) {
        return -1; // a is upcoming, b is not upcoming, so a should come first
      } else if (!aIsUpcoming && bIsUpcoming) {
        return 1; // b is upcoming, a is not upcoming, so b should come first
      } else if (aIsOver && !bIsOver) {
        return 1; // a is over, b is not over, so b should come first
      } else if (!aIsOver && bIsOver) {
        return -1; // b is over, a is not over, so a should come first
      } else {
        // both events are either ongoing, upcoming, or over, sort by startDate proximity to current date
        const aStartDateDiff = differenceInMilliseconds(a.startDate, new Date());
        const bStartDateDiff = differenceInMilliseconds(b.startDate, new Date());
        return aStartDateDiff - bStartDateDiff;
      }
    });

    return sortedEvents;
}