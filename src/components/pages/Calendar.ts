import { CalendarEntry } from "../utils/calendar-entry"
import { CalendarHelper } from "../utils/calendar.helper"
import { DateHelper } from "../utils/date.helper"
import { CalenderElementsHelper } from "../utils/calender-elements.helper";

const template = document.createElement('template')

template.innerHTML = `
  <style>
    .calendar {
      font-family: Arial, sans-serif;
    }
    
    .calendar > * {
      line-height: 3.5rem;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      font-weight: bold;
      font-size: 1.1rem;
      margin: 0 1.8rem;
    }
    
    .calendar span {
      flex-grow: 30;
      width: calc(100% / 7);
      text-align: center;
    }
    
    .calendar header span:first-child,
    .calendar header span:last-child{
      flex-grow: .1;
      cursor: pointer;
    }
    
    .day-names {
      display: flex;
    }
    
    .days-in-month {
      display: flex;
      flex-wrap: wrap;
    }
    
    .days-in-month span {
      cursor: pointer;
      position: relative;
    }
    
    .days-in-month i {
      padding: .8rem;
      font-style: normal;
      position: relative;
      width: 100%;
    }
    
    .days-in-month i.padding-single-digit {
      padding: .8rem 1.1rem;
    }
    
    .days-in-month span.disabled {
      color: #ccc;
      cursor: default;
    }
    
    .material .days-in-month span:hover:not(.disabled) i:not(.selected) {
      background: #e6d2f1;
      border-radius: 50%;
    }
    
    .material .days-in-month i.active {
      border: 2px solid #000;
      border-radius: 50%;
      padding: .6rem;
    }
    
    .material .days-in-month i.selected {
      background: #902dc6;
      color: #fff;
      border-radius: 50%;
    }
    
    .material .days-in-month i.has-event:before {
      content: ' \\25CF';
      font-size: .7rem;
      position: absolute;
      top: .4rem;
      left: 1.18rem;
      color: #902dc6;
    }
    
    .material .days-in-month i.selected.has-event:before {
      color: #fff;
    }
    
    .material .days-in-month i.active.has-event:before {
      top: .1rem;
      left: 1.1rem;
    }
    
    span.arrows {
       width: .7rem;
       height: .7rem;
    }
    
    .arrows:hover {
        border-color: #902dc6;
    }
    
    .previous {
       border-bottom: 3px solid;
       border-left: 3px solid;
       transform: rotate(45deg);
    }
       
    .next {
       border-bottom: 3px solid;
       border-left: 3px solid;
       transform: rotate(-135deg);
    }
    
    .days-in-month span.not-available {
        text-decoration: line-through;
    }
  </style>
  <div class="calendar material">
    <header>
      <span id="previous-month" class="arrows previous"></span>
      <span>
        <span id="month-name"></span>
        <span id="year"></span>
      </span>
      <span id="next-month" class="arrows next"></span>
    </header>
    <div class="day-names" id="day-names"></div>
    <div class="days-in-month" id="days-in-month"></div>
  </div>
`

class Calendar extends HTMLElement {
    private fillStartCount: number
    private fillEndCount: number
    private readonly date: CalendarEntry
    private daysInMonth: number[]
    private dateHelper: DateHelper

    private _selectedDate: CalendarEntry
    private _disabledDates: CalendarEntry[] = []
    private _dayNames: string[] = [
        'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'
    ]
    private _monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
    private _showFillDays: boolean = true
    private _currentMonth: number
    private _today: CalendarEntry
    private _disableDaysBeforeToday: boolean = false

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.dateHelper = new DateHelper()
        this.date = this.dateHelper.getValidDate()
    }

    connectedCallback() {
        this.setCalendarDays()
        this.monthSwitchHandler()
        this.fillHeader()
        this.fillDayNames()
        this.showDaysInMonth()
        this.setCurrentMonth()

        const today = CalendarHelper.getToday()
        this.setAttribute('today', Object.values(today).join('.'))
        this._today = today
    }

    /**
     * Observe changes of your attributes
     */
    static get observedAttributes() {
        return [
            'day-names',
            'month-names',
            'show-fill-days',
            'selected-date',
            'disable-days-before-today',
            'primary-color',
            'secondary-color',
            'header-text-color',
            'disabled-text-color',
            'day-text-color',
            'selected-text-color',
            'today-border-color',
        ]
    }

    /**
     * Handle attribute changes
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     * @returns
     */
    attributeChangedCallback(
        name: string,
        oldValue: string | string[] | CalendarEntry,
        newValue: string | string[] | CalendarEntry,
    ) {
        if (oldValue === newValue) {
            return
        }

        switch (name) {
            case 'day-names':
                this._dayNames = (newValue as string).split(',')
                break
            case 'month-names':
                this._monthNames = (newValue as string).split(',')
                break
            case 'show-fill-days':
                this._showFillDays = newValue !== 'false'
                break
            case 'disable-days-before-today':
                this._disableDaysBeforeToday = newValue !== 'false'
                break
            case 'selected-date':
                this._selectedDate = newValue as CalendarEntry
                break
            case 'primary-color':
                this.primaryColor = newValue as string
                break
            case 'secondary-color':
                this.secondaryColor = newValue as string
                break
            case 'header-text-color':
                this.headerTextColor = newValue as string
                break
            case 'disabled-text-color':
                this.disabledTextColor = newValue as string
                break
            case 'day-text-color':
                this.dayTextColor = newValue as string
                break
            case 'selected-text-color':
                this.selectedTextColor = newValue as string
                break
            case 'today-border-color':
                this.todayBorderColor = newValue as string
                break
        }
    }

    set primaryColor(color: string) {
        this.appendStyle(`
          .material .days-in-month i.selected {
            background: ${color} !important
          }
          
          .arrows:hover {
            border-color: ${color} !important
          }
        `);
    }

    set secondaryColor(color: string) {
        this.appendStyle(`
          .material .days-in-month span:hover:not(.disabled) i:not(.selected) {
            background: ${color} !important
          }
        `);
    }

    set headerTextColor(color: string) {
        this.appendStyle(`
          .calendar header {
            color: ${color} !important
          }
        `);
    }

    set disabledTextColor(color: string) {
        this.appendStyle(`
          .days-in-month span.disabled {
            color: ${color};
          }
        `);
    }

    set dayTextColor(color: string) {
        this.appendStyle(`
          .calendar {
            color: ${color};
          }
        `);
    }

    set selectedTextColor(color: string) {
        this.appendStyle(`
          .material .days-in-month i.selected {
            color: ${color};
          }
        `);
    }

    set todayBorderColor(color: string) {
        this.appendStyle(`
          .material .days-in-month i.active {
            border-color: ${color};
          }
        `);
    }

    set dayNames(dayNames: string[]) {
        this._dayNames = dayNames
        this.updateCalendar()
    }

    set monthNames(monthNames: string[]) {
        this._monthNames = monthNames
        this.updateCalendar()
    }

    set showFillDays(showFillDays: boolean) {
        this._showFillDays = showFillDays
        this.updateCalendar()
    }

    set selectedDate(selectedDate: CalendarEntry) {
        this._selectedDate = selectedDate
        this.setAttribute('selected-date', Object.values(selectedDate).join('.'))
    }

    get selectedDate() {
        return this._selectedDate
    }

    set disabledDates(disabledDates: CalendarEntry[]) {
        this._disabledDates = disabledDates
        this.showDaysInMonth(true)
    }

    get currentMonth() {
        return this._currentMonth
    }

    get today() {
        return this._today
    }

    set disableDaysBeforeToday(disableDaysBeforeToday) {
        this._disableDaysBeforeToday = disableDaysBeforeToday
    }

    get disableDaysBeforeToday() {
        return this._disableDaysBeforeToday
    }

    /**
     * Fill header with text
     * @private
     */
    private fillHeader(): void {
        const monthName = this.shadowRoot.getElementById('month-name')
        monthName.innerText = this._monthNames[this.date.month - 1]

        const year = this.shadowRoot.getElementById('year')
        year.innerText = String(this.date.year)
    }

    /**
     * Fill sub header with day names
     * @private
     */
    private fillDayNames(): void {
        const dayNames = this.shadowRoot.getElementById('day-names')
        this._dayNames.forEach(dayName => {
            const span = document.createElement('span')
            span.innerText = dayName
            dayNames.appendChild(span)
        })
    }

    /**
     * Switch between months
     * @private
     */
    private monthSwitchHandler(): void {
        const previousMonth = this.shadowRoot.getElementById('previous-month')
        previousMonth.addEventListener('click', () => {
            this.dateHelper.setDateToPreviousMonth(this.date)
            this.setCalendarDays();
            this.updateCalendar();
        })

        const nextMonth = this.shadowRoot.getElementById('next-month')
        nextMonth.addEventListener('click', () => {
            this.dateHelper.setDateToNextMonth(this.date)
            this.setCalendarDays();
            this.updateCalendar();
        })
    }

    /**
     * Update property for calendar days
     * @private
     */
    private setCalendarDays(): void {
        const calendar = new CalendarHelper(this.date.year, this.date.month)
        this.daysInMonth = calendar.getCalendarDays()
        this.fillStartCount = calendar.getFillStartCount()
        this.fillEndCount = (calendar.daysInCalendar - calendar.getFillEndCount())
    }

    /**
     * Update calendar after changes
     * @private
     */
    private updateCalendar(): void {
        this.showDaysInMonth(true)
        this.fillHeader()
        this.setCurrentMonth()
    }

    /**
     * Show days in month
     * @param clear
     * @private
     */
    private showDaysInMonth(clear = false) {
        const daysInMonth = this.shadowRoot.getElementById('days-in-month')

        if (clear) {
            CalenderElementsHelper.clear(daysInMonth)
        }

        this.daysInMonth.forEach((day: number, index: number) => {
            const span = this.buildDay(day, index)
            daysInMonth.appendChild(span)
        })
    }

    /**
     * Build one day, fill days are disabled, others have a click event
     * @param day
     * @param index
     * @private
     */
    private buildDay(day: number, index: number): HTMLSpanElement {
        let span: HTMLSpanElement;
        const isDisabledDay = this.isDisabledDay(day)

        if ((index < this.fillStartCount || index >= this.fillEndCount)) {
            span = CalenderElementsHelper.buildDisabledDay(this._showFillDays, day)
        } else if (isDisabledDay) {
            span = CalenderElementsHelper.buildDisabledDay(true, day, 'not-available')
        } else {
            const cssClasses = this.getCssClassesForDay(day, index)
            span = CalenderElementsHelper.buildDay(day, cssClasses)
            span.addEventListener('click', (clickedDay) => {
                this.selectedDate = {
                    day,
                    month: this.date.month,
                    year: this.date.year
                }
                this.addSelectedCssClass(clickedDay)
            })
        }

        return span
    }

    /**
     * Add selected css class to clicked day
     * @param clickedDay
     * @private
     */
    private addSelectedCssClass(clickedDay: Event) {
        this.shadowRoot
            .querySelectorAll('.selected')
            .forEach(e => e.classList.remove('selected'))

        const target = clickedDay.target as HTMLElement
        target.classList.add('selected')
    }

    /**
     * Is in list for disabled days
     * @param day
     * @private
     */
    private isDisabledDay(day: number) {
        let isDisabled = false;

        const isGivenDateInDisabledDates = this._disabledDates
            .filter(d => d.day === day && d.year === this.date.year && d.month === this.date.month).length > 0
        if (
            isGivenDateInDisabledDates
            || (CalendarHelper.isDayBeforeToday(this.date.year, this.date.month, day) && this._disableDaysBeforeToday)
        ) {
            isDisabled = true;
        }

        return isDisabled;
    }

    /**
     * Get css classes for given day
     * @param day
     * @param index
     * @private
     */
    private getCssClassesForDay(day: number, index: number) {
        return CalenderElementsHelper.getCssClassesForDay(
            day,
            index,
            this.fillStartCount,
            this.fillEndCount,
            this._selectedDate,
            this.date,
        )
    }

    private setCurrentMonth(): void {
        this.setAttribute('current-month', String(this.date.month))
        this._currentMonth = this.date.month
    }

    private appendStyle(newStyle: string): void {
        const style = document.createElement('style');
        style.innerHTML = newStyle;
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('date-picker', Calendar)
