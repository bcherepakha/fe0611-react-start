console.clear();

const Calendar = require('./Calendar/Calendar'),
    TodoList = require('./TodoList/TodoList');

// Global variables
const currentDay = new Date(),
      currentMonth = currentDay.getMonth(),
      currentYear = currentDay.getFullYear(),
      calendarComponent = new Calendar({
        startMonth: currentMonth,
        startYear: currentYear,
        clickDayHandler: showTodoList
      }),
      todoComponent = new TodoList( currentDay ),
      contentEl = document.getElementById('content');

function showTodoList( day ) {
  todoComponent.setCurrentDay( day );
}

// todoComponent.setState({data: []}); // clean data

// render component Calendar in document
contentEl.append( calendarComponent.render());
document.body.append( todoComponent.render() );
