## Simple native web component calendar

Native HTML web component calendar. Can easily be used in any framework or plain HTML.

![calendar explained](https://raw.githubusercontent.com/pguso/calendar-web-component/main/images/calendar.png)

### Styled Examples

[Material Design (Pen)](https://codepen.io/pguso/pen/mdwyWMJ)

[Simple Design (Pen)](https://codepen.io/pguso/pen/vYZEJJY)

[Mobile Design (Pen)](https://codepen.io/pguso/pen/VwWYzdw)

### Integration

#### Install the calendar component

```npm i calendar-native-web-component```

or 

```yarn add calendar-native-web-component```

#### Import the package 

```import 'calendar-native-web-component'```

or

```require('calendar-native-web-component')```

#### Use Tag

Just integrate this Tag into your HTML and you should see the component.

```<date-picker></date-picker>```

#### Properties

Example of setters

Usage in HTML file
```html
<date-picker
    id="date-picker"
    primary-color="#000"
    secondary-color="#999"
    disable-days-before-today="true"
    day-names="Mo, Di, Mi, Do, Fr, Sa, So"
    month-names="January, February, March, April, May, June, July, August, September, October, November, December"
    show-fill-days="false"></date-picker>
```

Usage in JavaScript
```javascript
const datePicker = document.getElementById('date-picker')
datePicker.dayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
datePicker.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
datePicker.showFillDays = false
datePicker.disableDaysBeforeToday = true
datePicker.disabledDates = root.disabledDates = [
    {year: 2021, day: 3, month: 9},
    {year: 2021, day: 12, month: 9},
    {year: 2021, day: 22, month: 9},
]
```

Example of getters

Usage in HTML file
```html
<date-picker
        id="date-picker"
        current-month="8" 
        today="24.8.2021" 
        selected-date="28.8.2021"></date-picker>
```

Usage in JavaScript
```javascript
const datePicker = document.getElementById('date-picker')
console.log(datePicker.selectedDate)
console.log(datePicker.currentMonth)
console.log(datePicker.today)
```

### Dev Setup

- clone repository
- open the console and switch into the root of this repository
- run `yarn` to install the dependencies 

### Run dev server

``` yarn start ```

Open http://localhost:8081/ in your browser and start building.

### Build for production use

``` yarn run build ```
