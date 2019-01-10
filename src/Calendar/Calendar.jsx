import React from 'react';

import './Calendar.css';

export const WEEKDAYS_NAMES = [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
    'вс'
];

export const MONTH_NAMES = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

class Calendar extends React.Component {
    static defaultPropps = {
        holidays: []
    }

    static getMonthDays( year, month ) {
        const firstDayInMonth = new Date(year, month, 1),
           firstWeekDayInMonth = (6 + firstDayInMonth.getDay())%7,
           lastDayInMont = new Date(year, month + 1, 0),
           lastWeekDayInMont = lastDayInMont.getDay() === 0
              ? 6
              : lastDayInMont.getDay() - 1,
           startDay = new Date(year, month, 1 - firstWeekDayInMonth),
           endDay = new Date(year, month + 1, 6 - lastWeekDayInMont),
           result = [];

        for(
          var currentDay = new Date(startDay);
          currentDay <= endDay;
          currentDay.setDate(currentDay.getDate() + 1)
        ) {
          result.push( new Date(currentDay) );
        }

        return {
          firstDayInMonth,
          lastDayInMont,
          firstWeekDayInMonth,
          lastWeekDayInMont,
          startDay,
          endDay,
          daysList: result
        };
    }

    constructor(props) {
        super(props);

        const {startYear, startMonth} = props,
            startDay = new Date(startYear, startMonth, 1);

        this.state = {
            currentMonth: startDay.getMonth(),
            currentYear: startDay.getFullYear()
        };

        // this.createDayElHandler = this.createDayEl.bind(this);
    }

    getHoliday(renderDate) {
        const {holidays} = this.props;

        return holidays.find(({day}) => +day === +renderDate);
    }

    createDayEl = renderDate => {
        const {currentMonth} = this.state,
            {currentDay} = this.props,
            holiday = this.getHoliday(renderDate);
        let className = [];

        if (renderDate.getMonth() !== currentMonth) {
            className.push('not-in-month');
        }

        if (holiday) {
            className.push('holiday');
        }

        if (+currentDay === +renderDate) {
            className.push('current-day');
        }

        return <li
            key={renderDate.toString()}
            className={className.join(' ')}>
          {renderDate.getDate()}
        </li>;
    }

    goPrevMonth = e => {
        e.preventDefault();

        this.shiftMonth(-1);
    }

    goNextMonth = e => {
        e.preventDefault();

        this.shiftMonth(1);
    }

    shiftMonth(shiftLength) {
        // const {currentYear, currentMonth} = this.state,
        //     startDay = new Date(currentYear, currentMonth + shiftLength, 1);
        //
        // this.setState({
        //     currentMonth: startDay.getMonth(),
        //     currentYear: startDay.getFullYear()
        // });

        this.setState(prevState => {
            const {currentYear, currentMonth} = prevState,
                startDay = new Date(currentYear, currentMonth + shiftLength, 1);

            return {
                currentMonth: startDay.getMonth(),
                currentYear: startDay.getFullYear()
            };
        });
    }

    render() {
        const {currentMonth, currentYear} = this.state,
            {daysList} = Calendar.getMonthDays(currentYear, currentMonth);

        return <div className="calendar">
            <div className="calendar-controls">
                <button
                    onClick={this.goPrevMonth}
                    className="calendar__prev-month">
                    &lt;
                </button>
                <div className="calendar__title">
                    {`${MONTH_NAMES[currentMonth]} ${currentYear}`}
                </div>
                <button
                    onClick={this.goNextMonth}
                    className="calendar__next-month">
                    &gt;
                </button>
            </div>
            <ul className="calendar-weekdays">
                {WEEKDAYS_NAMES.map(weekName => <li key={weekName}>{weekName}</li>)}
            </ul>
            <ul className="calendar-days">
                {daysList.map(this.createDayEl)}
            </ul>
        </div>;
    }
}

export default Calendar;
