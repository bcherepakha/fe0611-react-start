import React from 'react';

class Calendar extends React.Component {
    render() {
        return <div className="calendar">
            <div className="calendar-controls">
                <a className="calendar__prev-month" href="#">&lt;</a>
                <div className="calendar__title">
                    Январь 2019
                </div>
                <a className="calendar__next-month" href="#">&gt;</a>
            </div>
            <ul className="calendar-weekdays">
                <li>пн</li>
                <li>вт</li>
                <li>ср</li>
                <li>чт</li>
                <li>пт</li>
                <li>сб</li>
                <li>вс</li>
            </ul>
            <ul className="calendar-days">
                <li className="not-in-month" data-day="2018-111-31">31</li>
                <li data-day="2019-01-1">1</li>
                <li data-day="2019-01-2">2</li>
                <li data-day="2019-01-3">3</li>
                <li data-day="2019-01-4">4</li>
                <li data-day="2019-01-5">5</li>
                <li data-day="2019-01-6">6</li>
                <li data-day="2019-01-7">7</li>
                <li data-day="2019-01-8">8</li>
                <li data-day="2019-01-9">9</li>
                <li data-day="2019-01-10">10</li>
                <li data-day="2019-01-11">11</li>
                <li data-day="2019-01-12">12</li>
                <li data-day="2019-01-13">13</li>
                <li data-day="2019-01-14">14</li>
                <li data-day="2019-01-15">15</li>
                <li data-day="2019-01-16">16</li>
                <li data-day="2019-01-17">17</li>
                <li data-day="2019-01-18">18</li>
                <li data-day="2019-01-19">19</li>
                <li data-day="2019-01-20">20</li>
                <li data-day="2019-01-21">21</li>
                <li data-day="2019-01-22">22</li>
                <li data-day="2019-01-23">23</li>
                <li data-day="2019-01-24">24</li>
                <li data-day="2019-01-25">25</li>
                <li data-day="2019-01-26">26</li>
                <li data-day="2019-01-27">27</li>
                <li data-day="2019-01-28">28</li>
                <li data-day="2019-01-29">29</li>
                <li data-day="2019-01-30">30</li>
                <li data-day="2019-01-31">31</li>
                <li className="not-in-month" data-day="2019-11-1">1</li>
                <li className="not-in-month" data-day="2019-11-2">2</li>
                <li className="not-in-month" data-day="2019-11-3">3</li>
            </ul>
        </div>;
    }
}

export default Calendar;
