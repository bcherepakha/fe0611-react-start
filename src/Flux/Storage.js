import MicroEvent from 'microevent';

const events = {};

let todoListDay = new Date();

export const Storage = {
    // set todoListDay(value) {
    //     todoListDay = value;
    //     this.trigger('change');
    // },
    // get todoListDay() {
    //     return todoListDay;
    // },
    todoListDay,
    changeTodoListDay(value) {
        this.todoListDay = value;
        this.trigger('change');
    },
    trigger(eventName) {
        if (events[eventName]) {
            events[eventName].forEach(f => f());
        }
    },
    addEventListener(eventName, func) {
        if (!events[eventName]) {
            events[eventName] = [];
        }

        events[eventName].push(func);
    },
    removeEventListener(eventName, func) {
        if (events[eventName]) {
            events[eventName] = events[eventName].filter(f => f !== func);
        }
    }
};


const MicroStorage = new MicroEvent();

MicroStorage.todoListDay = new Date();

MicroStorage.changeTodoListDay = function(value) {
    this.todoListDay = value;
    this.trigger('change');
}

export {MicroStorage};
