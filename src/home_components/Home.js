import React, { Component } from 'react';
import nodlimg from './nodeadline.jpg';
import DateCountdown from 'react-date-countdown-timer';

class Home extends Component {
    createItem = (todo) => {
        return (<li className="home__item" key={todo._id}>{todo.text}</li>);
    }
    render() {
        let tododate;
        if (this.props.todos.length !== 0) {
            tododate = new Date(this.props.todos[0].date);
            tododate.setHours( tododate.getHours() + 16 );
        }
        return (
            <div>
                {this.props.todos.length !== 0 
                ? (
                <div>
                    <h1 className="warning blink" >Warning</h1>
                    <div className="home__countdown"><DateCountdown dateTo={String(tododate)}/></div>
                    <ul className="home__list">{this.props.todos.map(this.createItem)}</ul>
                </div>) 
                : (
                <div>
                    <h3 className="warning">No todos</h3>
                    <img className="home__image" src={nodlimg} alt={"Home"} />
                </div>
                )}
            </div>
        );
    }
}

export default Home;