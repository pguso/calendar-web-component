## Simple native web component calendar

Native HTML web component calendar. Can easily be used in any framework or plain HTML.

![alt text](https://raw.githubusercontent.com/pguso/calendar-web-component/main/images/calendar.png)

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
