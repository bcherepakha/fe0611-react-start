import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

class TodoList extends React.Component {
    static propTypes = {
        currentDay: PropTypes.instanceOf(Date).isRequired
    }

    static getDayKey( dayObj ) {
      return [
        dayObj.getFullYear(),
        (dayObj.getMonth() + '1').padStart(2, '0'),
        dayObj.getDate()
      ].join('-');
    }

    constructor(props) {
        super(props);

        const {currentDay} = this.props;

        this.state = {
            currentDay,
            ...this.getCurrentDayParams(currentDay),
            taskText: ''
        }
    }

    getCurrentDayParams(currentDay) {
        const currentDayObj = new Date(currentDay),
            currentDayKey = TodoList.getDayKey(currentDayObj),
            currentStorageKey = `TODO_LIST_${currentDayKey}`;
        let data = [];

        try {
            data = JSON.parse(window.localStorage[currentStorageKey] || '[]');
        } catch (ex) {
            console.error(`can't parse data for ${currentStorageKey}`);
        }

        return {
            currentDayKey,
            currentStorageKey,
            data
        };
    }

    changeTaskText = e => {
        const {value} = e.target;

        this.setState({
            taskText: value
        });
    }

    addTask = e => {
        e.preventDefault();

        this.setState(prevState => {
            const {taskText, data, currentStorageKey} = this.state,
                newData = [...data];

            newData.push({
                id: new Date().toISOString(),
                text: taskText
            });

            window.localStorage[currentStorageKey] = JSON.stringify(newData);

            return {
                taskText: '',
                data: newData
            }
        });
    }

    deleteTask(taskData) {
        return () =>
            this.setState(prevState => {
                return {
                    data: prevState.data.filter(el => el !== taskData)
                }
            });
    }

    renderListElement = (data = {}, index) => {
        const {id, text = ''} = data;

        return <li key={id || index} className='todo__item'>
            {text}
            <button onClick={this.deleteTask(data)}>Del</button>
        </li>;
    }

    render() {
        const {currentDayKey, data, taskText} = this.state;

        return <div className="todo">
            <h3 className="todo__banner">
                {`TODO List ${currentDayKey}`}
            </h3>
            <ol className="todo__list">
                {data.map(this.renderListElement)}
            </ol>
            <form className="todo__form" onSubmit={this.addTask}>
                <input
                    onChange={this.changeTaskText}
                    className="todo__form-input"
                    type="text"
                    value={taskText}/>
                <button className="todo__form-add" type="submit">Add</button>
            </form>
        </div>;
    }
}

export default TodoList;
