import AppActions from './AppActions';
import MicroEvent from 'microevent';

const AppStore = new MicroEvent();

// add Dispatcher
AppActions.iDispatcher.register(payload => {
    switch (payload.eventName) {
        default:
            console.log('unknown event', {payload});
            break;
    }

    return true;
});

export default AppStore;
