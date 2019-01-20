import React, { Component } from 'react';

import Calendar from './Calendar/Calendar.jsx';
import TodoList from './TodoList/TodoList';
import FindBeer from './FindBeer/FindBeer';
import BeerList from './BeerList/BeerList';

import AppStore from './Flux/AppStore';
import AppActions from './Flux/AppActions';

import {Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';

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

class Content extends Component {
    state = {
        selected: 'home',
        beerName: ''
    }

    handleSelect = eventKey => {
        this.setState({
            selected: eventKey
        });
    }

    setBeerName = beerName => this.setState({beerName})

    render() {
        const {selected, beerName} = this.state;

        return <Col lg={8} sm={6} xs={12} className='content-body'>
            <Nav bsStyle="pills" activeKey={selected} onSelect={this.handleSelect}>
              <NavItem eventKey='home' title='home'>
                NavItem home content
              </NavItem>
              <NavItem eventKey='item' title="Item">
                NavItem Item content
              </NavItem>
              <NavItem eventKey='3' title='Item 3'>
                NavItem 3 content
              </NavItem>
            </Nav>
            <FindBeer submitHandler={this.setBeerName}/>
            {beerName && <BeerList beerName={beerName}/>}
        </Col>;
    }
}

function Sidebar(props) {
    return <Col lg={4} sm={6} xs={12} className='component-aside'>
        {props.children}
    </Col>;
}

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

    componentDidMount() {
        AppStore.bind('change', this.changeTodoListDayInStore);
    }

    componentWillUnmount() {
        AppStore.unbind('change', this.changeTodoListDayInStore);
    }

    changeTodoListDayInStore = () => {
        this.setState({
            todoListDay: AppStore.todoListDay
        });
    }

    hideTodoList = () => {
        AppActions.changeTodoListDay(null);
    }

    // changeTodoListDay = day => {
    //     this.setState({
    //         todoListDay: day
    //     });
    // }

    render() {
        const {
            currentMonth,
            currentYear,
            currentDay,
            todoListDay
        } = this.state;

        return <Grid>
            <Row>
                <Content/>
                <Sidebar>
                    <Calendar
                        holidays={HOLIDAYS}
                        currentDay={currentDay}
                        startMonth={currentMonth}
                        startYear={currentYear}/>
                </Sidebar>
            </Row>
            {todoListDay && <TodoList hide={this.hideTodoList}/>}
        </Grid>;
    }
}

export default App;
