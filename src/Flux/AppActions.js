/* Классическая библиотека flux (https://facebook.github.io/flux/docs/overview.html)
 * предоставляет нам только Dispatcher, но нам больше ничего и не нужно
 */
import {Dispatcher} from 'flux';

const iDispatcher = new Dispatcher();

//add logs
iDispatcher.register(console.log);

export default {
    iDispatcher,
    eventName: function() {
        iDispatcher.dispatch({
            eventName: 'eventName'
        });
    }
};
