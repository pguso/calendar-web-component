import { DateHelper } from "./date.helper"
import { CalendarEntry } from "./calendar-entry"

export class CalenderElementsHelper {
    public static buildDay(
        day: number,
        cssClasses: string,
    ): HTMLSpanElement {
        const span = document.createElement('span')

        const i = document.createElement('i')
        i.className = cssClasses
        i.innerText = String(day)

        span.appendChild(i)

        return span
    }

    public static buildDisabledDay(showFillDays: boolean, day: number, additionalClass = ''): HTMLSpanElement {
        const span = document.createElement('span')
        span.className = `disabled ${additionalClass}`
        span.innerText = String(showFillDays ? day : '')

        return span
    }

    public static clear(element: HTMLElement) {
        element.innerText = ''
    }

    public static getCssClassesForDay(
        day: number,
        index: number,
        fillStartCount: number,
        fillEndCount: number,
        selectedDate: CalendarEntry,
        date: CalendarEntry,
    ): string {
        let classNameDigit = []
        if (day.toString().length === 1) {
            classNameDigit.push('padding-single-digit')
        }

        if (DateHelper.isToday(day, date.month, date.year, index, fillStartCount, fillEndCount)) {
            classNameDigit.push('active')
        }

        if (DateHelper.isSelectedDay(day, index, selectedDate, fillStartCount, fillEndCount, date)) {
            classNameDigit.push('selected')
        }

        return classNameDigit.join(' ')
    }
}
