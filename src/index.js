import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from'./containers/TodoList';
import * as serviceWorker from './serviceWorker';
import './static/calendar.css';
import './static/weather.css';
import './static/todo.css';

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);


serviceWorker.unregister();
