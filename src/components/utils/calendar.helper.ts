import { CalendarEntry } from './calendar-entry'

export class CalendarHelper {
    readonly year: number
    readonly month: number
    readonly daysInCalendarWithFiveRows = 42
    readonly daysInCalendarWithFourRows = 35
    readonly daysInCalendarWithThreeRows = 28

    public daysInCalendar = this.daysInCalendarWithFourRows

    private fillStartCount = 0
    private fillEndCount = 0
    private currentMonthCount: number
    private fillCount = [6, 0, 1, 2, 3, 4, 5]

    constructor(year: number, month: number) {
        this.year = year
        this.month = month
    }

    public getCalendarDays(): number[] {
        const daysOfCurrentMonth = this.getDaysOfCurrentMonth()
        const fillStartCount = this.fillCount[this.getFirstDayOfMonth()]
        const fillEndCount = this.daysInCalendarWithFourRows - (daysOfCurrentMonth.length + fillStartCount)

        this.currentMonthCount = daysOfCurrentMonth.length
        this.fillStartCount = fillStartCount
        this.fillEndCount = fillEndCount

        const fillStart = fillStartCount > 0 ? this.getDaysOfLastMonth(fillStartCount) : []
        const fillEnd = this.getDaysOfNextMonth(fillEndCount)

        return fillStart.concat(daysOfCurrentMonth).concat(fillEnd)
    }

    private getDaysOfCurrentMonth(): number[] {
        return this.getDaysOfMonth(this.month)
    }

    private getDaysOfLastMonth(fillStartCount: number): number[] {
        const daysOfMonth = this.getDaysOfMonth(this.month - 1)

        return daysOfMonth.slice(-fillStartCount)
    }

    private getDaysOfNextMonth(endCount: number): number[] {
        const daysOfMonth = this.getDaysOfMonth(this.month + 1)
        const isCalendarWithFiveRows = endCount <= -1
        const isCalendarWithThreeRows = endCount === 7 && (this.currentMonthCount + this.fillStartCount) === 28

        let fillDays: number[]
        if (isCalendarWithFiveRows) {
            fillDays = this.getFillDays(daysOfMonth, this.daysInCalendarWithFiveRows)
        } else if (isCalendarWithThreeRows) {
            fillDays = this.getFillDays(daysOfMonth, this.daysInCalendarWithThreeRows)
        } else {
            fillDays = daysOfMonth.slice(0, endCount)
        }

        return fillDays
    }

    private getFillDays(daysOfMonth: number[], dayCount: number): number[] {
        const endCount = dayCount - (this.currentMonthCount + this.fillStartCount)
        const fillDays = daysOfMonth.slice(0, endCount)
        this.daysInCalendar = dayCount
        this.fillEndCount = endCount

        return fillDays
    }

    private getDaysOfMonth(month: number): number[] {
        const daysOfMonth = new Date(this.year, month, 0).getDate()

        return Array.from({ length: daysOfMonth }, (_, i) => i + 1)
    }

    public getFirstDayOfMonth(): number {
        return new Date(this.year, this.month - 1, 1).getDay()
    }

    public getFillStartCount(): number {
        return this.fillStartCount
    }

    public getFillEndCount(): number {
        return this.fillEndCount
    }

    public static getToday(): CalendarEntry {
        return {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
    }

    public static convertNumbersToDate(year: number, month: number, day: number): Date {
        return new Date(`${year}-${month}-${day}`);
    }

    public static isDayBeforeToday(year: number, month: number, day: number) {
        let isBeforeToday = false
        const beforeToday = CalendarHelper.convertNumbersToDate(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
        )
        const givenDate = CalendarHelper.convertNumbersToDate(year, month, day)

        if (givenDate < beforeToday) {
            isBeforeToday = true
        }

        return isBeforeToday
    }
}
