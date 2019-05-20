import React, { Component } from 'react';
import Input from './Section_component/Input';
import TodoItem from './Section_component/TodoItem';

class Section extends Component {
    createItem = (todo) => {
            return (<TodoItem
            key = {todo._id} 
            todo = {todo}
            complete={() => this.props.completTodo(todo._id, todo.complete)}
            delete={() => this.props.deleteTodo(todo._id)}
            />);
    };
    render() {
        return (
        <section className="todo-app__main" id="todo-main">
            <Input add={this.props.add} length={this.props.length}/>
            {this.props.length !== 0 ?
                (<ul className="todo-app__list">
                    {this.props.todos.map(this.createItem)}    
                </ul>) : null}
        </section>
        );
    };
}

export default Section;
