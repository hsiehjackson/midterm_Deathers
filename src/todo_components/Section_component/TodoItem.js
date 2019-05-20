import React from 'react';
import logo from '../img/x.png';

export default props => {
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input id={props.todo.id } type="checkbox" checked={props.todo.complete} onChange={()=>{}}></input>
                <label htmlFor={props.todo.id}  onClick={props.complete}></label>
            </div>
            <p className="todo-app__item-time"
               style={{
               textDecoration: props.todo.complete ? "line-through":"",
               opacity: props.todo.complete ? 0.5:1}}>
            {props.todo.time}
            </p>
            <h1 className="todo-app__item-detail"
                style={{
                textDecoration: props.todo.complete ? "line-through":"",
                opacity: props.todo.complete ? 0.5:1}}>
            {props.todo.text}
            </h1>
            <img className="todo-app__item-x" src={logo} alt="X" onClick={props.delete}></img>
        </li> );
}