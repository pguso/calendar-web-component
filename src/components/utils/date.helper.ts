import { CalendarEntry } from "./calendar-entry";
import { CalendarHelper } from "./calendar.helper";

export class DateHelper {
    private date = CalendarHelper.getToday();

    public getValidDate(): CalendarEntry {
        let date = this.date;
        if (!('month' in this.date && 'year' in this.date)) {
            date = CalendarHelper.getToday();
        }

        return date;
    }

    public static isToday(
        day: number,
        month: number,
        year: number,
        index: number,
        fillStartCount: number,
        fillEndCount: number
    ): boolean {
        const today = CalendarHelper.getToday();
        return today.day === day
            && today.month === month
            && today.year === year
            && today.year === year
            && !(index < fillStartCount || index >= fillEndCount);
    }

    public static isSelectedDay(
        day: number,
        index: number,
        selectedDate: CalendarEntry,
        fillStartCount: number,
        fillEndCount: number,
        date: CalendarEntry
    ) {
        return typeof selectedDate !== 'undefined'
            && selectedDate.day === day
            && selectedDate.month === date.month
            && selectedDate.year === date.year
            && !(index < fillStartCount || index >= fillEndCount);
    }

    setDateToPreviousMonth(date: CalendarEntry) {
        if (date.month !== 1) {
            date.month -= 1
        } else {
            date.month = 12
            date.year -= 1
        }

        if (typeof date !== 'undefined') {
            delete date.day
        }
    }

    setDateToNextMonth(date: CalendarEntry) {
        if (date.month !== 12) {
            date.month += 1;
        } else {
            date.month = 1;
            date.year += 1;
        }

        delete this.date.day;
    }
}
