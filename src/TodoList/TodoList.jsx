import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import './TodoList.css';

// import {Storage} from '../Flux/Storage';
// import {MicroStorage} from '../Flux/Storage';

import AppStore from '../Flux/AppStore';

class TodoList extends React.Component {
    static propTypes = {
        currentDay: PropTypes.instanceOf(Date)
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
        if (props.currentDay) {
            return TodoList.getCurrentDayParams(props.currentDay);
        }

        return {};
    }

    constructor(props) {
        super(props);

        const {currentDay} = this.props;
        // const {todoListDay} = Storage;
        // const {todoListDay} = MicroStorage;
        const {todoListDay} = AppStore;

        this.state = {
            currentDay: currentDay || todoListDay,
            taskText: '',
            data: []
        };

        if (!currentDay) {
            this.state = {
                ...this.state,
                ...TodoList.getCurrentDayParams(todoListDay)
            };
        }
    }

    componentDidMount() {
        this.loadData();

        if (!this.props.currentDay) {
            // Storage.addEventListener('change', this.storageChanges);
            // MicroStorage.bind('change', this.storageChanges);
            AppStore.bind('change', this.storageChanges);
        }
    }

    componentWillUnmount() {
        if (!this.props.currentDay) {
            // Storage.removeEventListener('change', this.storageChanges);
            // MicroStorage.unbind('change', this.storageChanges);
            AppStore.unbind('change', this.storageChanges);
        }
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

    storageChanges = () => {
        // this.setState(TodoList.getCurrentDayParams(Storage.todoListDay));
        // this.setState(TodoList.getCurrentDayParams(MicroStorage.todoListDay));
        this.setState(TodoList.getCurrentDayParams(AppStore.todoListDay));
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
        const {currentDayKey, data, taskText} = this.state,
            {hide} = this.props;

        return <div className="todo">
            <h3 className="todo__banner">
                {`TODO List ${currentDayKey}`}
                {hide &&
                    <Button
                        bsStyle='danger'
                        onClick={hide}>
                        Hide
                    </Button>}
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
