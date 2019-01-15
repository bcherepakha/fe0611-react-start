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

    static getCurrentDayParams(currentDay) {
        const currentDayObj = new Date(currentDay),
            currentDayKey = TodoList.getDayKey(currentDayObj),
            currentStorageKey = `TODO_LIST_${currentDayKey}`;

        return {
            currentDayKey,
            currentStorageKey
        };
    }

    static getDerivedStateFromProps(props, state) {
        return TodoList.getCurrentDayParams(props.currentDay);
    }

    constructor(props) {
        super(props);

        const {currentDay} = this.props;

        this.state = {
            currentDay,
            taskText: '',
            data: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentStorageKey !== this.state.currentStorageKey) {
            this.loadData();
        }

        if (prevState.data !== this.state.data) {
            this.saveTask();
        }
    }

    loadData() {
        const {currentStorageKey} = this.state;
        let data = [];

        try {
            data = JSON.parse(window.localStorage[currentStorageKey] || '[]');
        } catch (ex) {
            console.error(`can't parse data for ${currentStorageKey}`);
        }

        this.setState({
            data
        });
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
            const {taskText, data} = this.state,
                newData = [...data];

            newData.push({
                id: new Date().toISOString(),
                text: taskText
            });

            return {
                taskText: '',
                data: newData
            }
        });
    }

    saveTask() {
        const {data, currentStorageKey} = this.state;

        window.localStorage[currentStorageKey] = JSON.stringify(data);
    }

    completeTask(taskData) {
        return () => {
            this.setState(prevState => {
                return {
                    data: prevState.data.map(el => {
                        if (el === taskData) {
                            const newTask = {
                                ...taskData,
                                completed: !taskData.completed
                            };

                            return newTask;
                        }

                        return el;
                    })
                }
            });
        };
    }

    deleteTask(taskData) {
        return () => {
            this.setState(prevState => {
                return {
                    data: prevState.data.filter(el => el.id !== taskData.id)
                }
            });
        };
    }

    renderListElement = (data = {}, index) => {
        const {id, text = '', completed = false} = data,
            classNames = ['todo__item'];

        if (completed) {
            classNames.push('todo__item--completed');
        }

        return <li
            key={id || index}
            className={classNames.join(' ')}>
            <span onClick={this.completeTask(data)}>{text}</span>
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
