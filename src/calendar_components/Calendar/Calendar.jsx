import React, { Component } from 'react';
import Month from '../Month';
import CalendarHead from '../CalendarHead';
import { AH, NiceDate } from '../../helpers';


class Calendar extends Component {

  today = new NiceDate();
  state = {
    openedMonth: new NiceDate(`${this.today.month}.1.${this.today.year}`)};

  onMonthChange = (command) => {
    const amount = command === 'prev' ? -1 : 1;
    this.setState((state) => ({
      openedMonth: NiceDate.newDate(state.openedMonth, 0, amount),
    }));
  };

  handleCalendarTodo = (todos) => {
    let new_todos = []
    for (let i = todos.length-1; i >= 0; i--){
      let dayIdx = new_todos.findIndex(({ date }) => date.show() === new NiceDate(todos[i].date).show());
      new_todos =  dayIdx !== -1 ? AH.modifyElement(new_todos, dayIdx, ({ date, activities }) => ({date,
                                   activities: [Calendar.newActivity(todos[i]._id,todos[i].text, todos[i].complete), ...activities]}))
                                : [Calendar.newDay(new NiceDate(todos[i].date), todos[i]._id, todos[i].text, todos[i].complete), ...new_todos]

    }
    return new_todos;
  };

  static newActivity = (_id ,name, complete) => ({
    id: _id,
    name,
    done: complete,
  });

  static newDay = (date, _id, name, complete) => ({
    date,
    activities: [Calendar.newActivity(_id, name, complete)],
  });



  render() {
    const {openedMonth} = this.state;
    let todos_calendar = this.handleCalendarTodo(this.props.todos);

    const currentTodos = todos_calendar.filter((el) =>
      [openedMonth.month - 1, openedMonth.month, openedMonth.month + 1]
        .map((el) => (el < 0 ? 12 + el : el > 12 ? el - 12 : el))
        .includes(el.date.month)
    );
    
    return (
      <div className="calendar">
        <div className="calendar__body">
          <Month
            monthObj={openedMonth}
            todos={currentTodos}
            forecast={this.props.forecast}
            tempType={this.props.tempType}
          />
        </div>
        <CalendarHead
          label={`${openedMonth.monthName}, ${openedMonth.year}`}
          onMonthChange={this.onMonthChange}
        />
      </div>
    );
  }
}

export default Calendar;
