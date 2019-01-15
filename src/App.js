import React, { Component } from 'react';

import Calendar from './Calendar/Calendar.jsx';
import TodoList from './TodoList/TodoList';

// import logo from './logo.svg';

import './App.css';

function getHolidays(fullYear) {
    return [
        {
            day: new Date(2019, 0, 1),
            title: 'Новый год'
        },
        {
            day: new Date(2019, 0, 7),
            title: 'Рождество Христово, православное'
        },
        {
            day: new Date(2019, 2, 8),
            title: 'Международный женский день'
        },
        {
            day: new Date(2019, 3, 28),
            title: 'Пасха'
        },
        {
            day: new Date(2019, 4, 1),
            title: 'День международной солидарности трудящихся'
        }
    ];
}

const HOLIDAYS = getHolidays(2019);

class App extends Component {
    constructor(props) {
        super(props);

        const currentDay = new Date();

        currentDay.setHours(0);
        currentDay.setMinutes(0);
        currentDay.setSeconds(0);
        currentDay.setMilliseconds(0);

        this.state = {
            currentDay,
            currentMonth: currentDay.getMonth(),
            currentYear: currentDay.getFullYear()
        };
    }

    // changeTodoListDay = day => {
    //     this.setState({
    //         todoListDay: day
    //     });
    // }

    render() {
        const {currentMonth, currentYear, currentDay} = this.state;

        return <React.Fragment>
            <Calendar
                holidays={HOLIDAYS}
                currentDay={currentDay}
                startMonth={currentMonth}
                startYear={currentYear}/>
            <TodoList/>
        </React.Fragment>;
    }
}

export default App;
