// Component Calendar Constructor
function Calendar({startMonth, startYear, clickDayHandler}) {
    let startDay = new Date(startYear, startMonth, 1),
        currentMonth = startDay.getMonth(),
        currentYear = startDay.getFullYear();
    const calendarEl = document.createElement('div'),
          calendarControlsEl = document.createElement('div'),
          calendarWeekdaysEl = document.createElement('ul'),
          calendarDaysEl = document.createElement('ul'),
          calendarPrevLinkEl = document.createElement('a'),
          calendarNextLinkEl = document.createElement('a'),
          calendarTitleEl = document.createElement('div'),
          WEEKDAYS_NAMES = [
            'пн',
            'вт',
            'ср',
            'чт',
            'пт',
            'сб',
            'вс'
          ],
          MONTH_NAMES = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
          ],
          goPrevMonth = shiftMonth.bind(this, -1),
          goNextMonth = shiftMonth.bind(this, 1);

    calendarEl.classList.add('calendar');
    calendarControlsEl.classList.add('calendar-controls');
    calendarWeekdaysEl.classList.add('calendar-weekdays');
    calendarDaysEl.classList.add('calendar-days');

    calendarPrevLinkEl.classList.add('calendar__prev-month');
    calendarPrevLinkEl.innerText = '<';
    calendarPrevLinkEl.setAttribute('href', "#");
    calendarPrevLinkEl.addEventListener('click', goPrevMonth);

    calendarNextLinkEl.classList.add('calendar__next-month');
    calendarNextLinkEl.innerText = '>';
    calendarNextLinkEl.setAttribute('href', "#");
    calendarNextLinkEl.addEventListener('click', goNextMonth);

    calendarTitleEl.classList.add('calendar__title');

    calendarWeekdaysEl.append.apply(
      calendarWeekdaysEl,
      WEEKDAYS_NAMES.map(dayName => {
        const liEl = document.createElement('li');

        liEl.innerText = dayName;

        return liEl;
      })
    );

    calendarControlsEl.append(calendarPrevLinkEl, calendarTitleEl, calendarNextLinkEl);

    calendarEl.append(calendarControlsEl, calendarWeekdaysEl, calendarDaysEl);

    if (clickDayHandler) {
      calendarDaysEl.addEventListener('click', function(e) {
        e.preventDefault();

        const liEl = e.target.closest('.calendar-days li');

        if (liEl) {
          clickDayHandler( liEl.dataset.day );
        }
      });
    }

    function shiftMonth(shiftLength) {
        startDay = new Date(currentYear, currentMonth + shiftLength, 1);
        currentMonth = startDay.getMonth();
        currentYear = startDay.getFullYear();

        render();
    }

    function getMonthDays( year, month ) {
        const firstDayInMonth = new Date(year, month, 1),
           firstWeekDayInMonth = (6 + firstDayInMonth.getDay())%7,
           lastDayInMont = new Date(year, month + 1, 0),
           lastWeekDayInMont = lastDayInMont.getDay() === 0
              ? 6
              : lastDayInMont.getDay() - 1,
           startDay = new Date(year, month, 1 - firstWeekDayInMonth),
           endDay = new Date(year, month + 1, 6 - lastWeekDayInMont),
           result = [];

        for(
          var currentDay = new Date(startDay);
          currentDay <= endDay;
          currentDay.setDate(currentDay.getDate() + 1)
        ) {
          result.push( new Date(currentDay) );
        }

        return {
          firstDayInMonth,
          lastDayInMont,
          firstWeekDayInMonth,
          lastWeekDayInMont,
          startDay,
          endDay,
          daysList: result
        };
    }

    function createDayEl(renderDate) {
      const liEl = document.createElement('li');

      liEl.innerText = renderDate.getDate();

      if (renderDate.getMonth() !== currentMonth) {
        liEl.classList.add('not-in-month');
      }

      liEl.dataset.day = getDayKey(renderDate);

      return liEl;
    }

    function render() {
      const title = `${MONTH_NAMES[currentMonth]} ${currentYear}`,
            {daysList} = getMonthDays(currentYear, currentMonth),
            daysListElCol = daysList.map(createDayEl);

      calendarTitleEl.innerText = title;
      calendarDaysEl.innerText = '';
      calendarDaysEl.append.apply(
        calendarDaysEl,
        daysListElCol
      );

      return calendarEl;
    }

    return {
      render,
      shiftMonth
    }
}
