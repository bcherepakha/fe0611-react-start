console.clear();

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

function getDayKey( dayObj ) {
  return [
    dayObj.getFullYear(),
    (dayObj.getMonth() + '1').padStart(2, '0'),
    dayObj.getDate()
  ].join('-');
}

// todoComponent.setState({data: []}); // clean data

// render component Calendar in document
contentEl.append( calendarComponent.render());
document.body.append( todoComponent.render() );
