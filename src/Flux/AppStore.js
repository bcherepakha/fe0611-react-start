import AppActions from './AppActions';
import MicroEvent from 'microevent';

const AppStore = new MicroEvent();

// AppStore.todoListDay = new Date();

// add Dispatcher
AppActions.iDispatcher.register(payload => {
    switch (payload.eventName) {
        case 'change-todo-list-day': {

            AppStore.todoListDay = payload.todoListDay;
            AppStore.trigger('change');

            break;
        }
        default:
            console.log('unknown event', {payload});
            break;
    }

    return true;
});

export default AppStore;
