const { getDayKey } = require('../Common.js');

console.log('hello!');

// Component TodoList Constructor
class TodoList {
  constructor( currentDay ) {
    const todoEl = document.createElement('div'),
          todoBannerEl = document.createElement('h3'),
          todoListEl = document.createElement('ol'),
          todoFormEl = document.createElement('form'),
          todoFormInputEl = document.createElement('input'),
          todoFormAddBtnEl = document.createElement('button');

    todoEl.classList.add('todo');

    todoBannerEl.classList.add('todo__banner');

    todoListEl.classList.add('todo__list');

    todoFormEl.classList.add('todo__form');

    todoFormInputEl.classList.add('todo__form-input');
    todoFormInputEl.setAttribute('type', 'text');

    todoFormAddBtnEl.classList.add('todo__form-add');
    todoFormAddBtnEl.setAttribute('type', 'submit');
    todoFormAddBtnEl.innerText = 'Add';

    todoFormEl.append(todoFormInputEl, todoFormAddBtnEl);
    todoEl.append(todoBannerEl, todoListEl, todoFormEl);

    todoFormEl.addEventListener('submit', this.addTask.bind(this));

    this.state = {}

    this.setCurrentDay(currentDay, false);

    this.elements = {
      todoEl,
      todoListEl,
      todoFormInputEl,
      todoBannerEl
    };
  }

  addTask(e) {
    e.preventDefault();
    const {todoFormInputEl} = this.elements,
          taskText = todoFormInputEl.value,
          {data, currentStorageKey} = this.state;

    todoFormInputEl.value = '';

    data.push({
      text: taskText
    });

    this.setState({data});
  }

  setCurrentDay(currentDay, needRender = true) {
      const currentDayObj = new Date(currentDay),
            currentDayKey = getDayKey(currentDayObj),
            currentStorageKey = `TODO_LIST_${currentDayKey}`;
      let data = [];

      try {
        data = JSON.parse( window.localStorage[currentStorageKey] || '[]');
      } catch(ex) {
        console.error(`can't parse data for ${currentStorageKey}`);
      }

      this.setState({
        currentDayKey,
        currentStorageKey,
        data
      }, needRender);
  }

  // please use only this method for changing state
  setState(newState = {}, needRender = true) {
    this.state = {
      ...this.state,
      ...newState
    };

    window.localStorage[this.state.currentStorageKey] = JSON.stringify(this.state.data);

    if (needRender) {
      this.render();
    }
  }

  renderListElement( data = {}) {
    const liEl = document.createElement('li'),
          {text = ''} = data;

    liEl.classList.add('todo__item');
    liEl.innerText = text;

    return liEl;
  }

  render() {
    const {data = [], currentDayKey} = this.state,
          {todoEl, todoListEl, todoBannerEl} = this.elements,
          listElCol = data.map(elData => this.renderListElement(elData));

          // listElCol = data.map(this.renderListElement.bind(this));

    todoBannerEl.innerText = `TODO List ${currentDayKey}`;

    todoListEl.innerText = '';
    todoListEl.append.apply(
      todoListEl,
      listElCol
    );

    return todoEl;
  }
}

module.exports = TodoList;
