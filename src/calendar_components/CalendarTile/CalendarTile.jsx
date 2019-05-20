import React, { Component } from 'react';
import Todo from '../Todo';
import { classNames } from '../../helpers';
import { NiceDate } from '../../helpers';

class CalendarTile extends Component {

  render() {
    const {
      dayObj,
      weather,
      tempType,
      activities,
      isFromOtherMonth,
    } = this.props;

    const hasweather = typeof weather !== 'undefined';
    const isEmpty = activities.filter(todo => !todo.done).length === 0;
    var max_temp, min_temp;
    const todos = activities.filter(todo => !todo.done).map((todo) => 
      <Todo
        todoObj={todo}
        key={`todo-${todo.id}`}/>);

    if (hasweather){
      if (tempType === 'C') {
        max_temp = ((weather.max_temp - 32) * (5/9)).toFixed(2);
        min_temp = ((weather.min_temp - 32) * (5/9)).toFixed(2);
      }
      else {
        max_temp = weather.max_temp;
        min_temp = weather.min_temp;
      }
    }
    const weekend = (dayObj.day === 0 || dayObj.day === 6);
    const today = (dayObj.show() === new NiceDate().show());

    return (
      <div
        className={classNames(
          'tile',
          { 'tile--other-month': isFromOtherMonth },
          { 'tile--not-empty': !isEmpty }
        )}
      >
        <div className="tile__content">{todos}</div>        
        {hasweather ? (
        <div className="tile__weather">
          <div className="tile__temp">
            {Math.round(min_temp)}-{Math.round(max_temp)}&deg;{tempType}
          </div>
          <div className="tile__icon">
            <i className={`wi wi-owm-${weather.weather[0].id}`} />
          </div>
        </div>) 
        : null}

        <div className="tile__label">
          <div className="tile__label__name" 
          style={{ color: today ? '#ecb745' : (weekend ? 'rgb(197, 86, 86)': '#57636e') }}>{dayObj.date}</div>
        </div>
      </div>
    );
  }
}

export default CalendarTile;
