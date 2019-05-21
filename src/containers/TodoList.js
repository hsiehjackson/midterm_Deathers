import React from 'react';
import Header from '../todo_components/Header';
import Section from '../todo_components/Section';
import Footer from '../todo_components/Footer';
import Calendar from '../calendar_components/Calendar';
import Home from '../home_components/Home';
import Weather from '../weather_components/Weather';
import moment from 'moment'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

var openWeatherMap = require('../weather_components/api/openWeatherMap.jsx');

class TodoList extends React.Component {
    constructor(props){
        super(props);
        const localStorageVal = (localStorage) && localStorage.getItem('react-weather-app.temperature');
        this.state = {
            todos: [],
            todoToShow: "all",
            
            isLoading: true,
            location: {},
            today: null,
            forecast: [],
            tempType: (localStorageVal) ? localStorageVal : 'F'
        };
        this.getTodos();
        this.getLocation();
    };
    

    getTodos = () => {
        fetch('/api/todos')
            .then(response => response.json())
            .then(data => this.setState({todos: data}));
    }

    getLocation = () => {
        fetch('/api/location')
        .then(response => response.json())
        .then(data => {this.setState({location: data[0]}); return data[0].text;})
        .then(
            async location => {
                let currentWeather = await openWeatherMap.getWeather('weather', location);
                let forecastWeather = await openWeatherMap.getWeather('forecast', location);
                this.addweather(location, currentWeather, forecastWeather.list, false);
            }
        );
    }

    updateShow = (s) => {
        this.setState({
            todoToShow: s
        });
    };

    removeAllcomplete = async () => {
        let complete_todos = this.state.todos.filter(todo => todo.complete);
        const promises = complete_todos.map((item) => {
            const result = fetch("/api/todos/" + item._id, {method: "DELETE"});
            return result;
        });
        await Promise.all(promises);
        this.setState({todos: this.state.todos.filter(todo => !todo.complete)});
        //this.componentDidMount();
    };


    addTodo = async (todo) => {
        await fetch('/api/todos', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({todo})
        });
        this.getTodos();
    };

    deleteTodo = async (id) => {
        await fetch("/api/todos/" + id, {
            method: "DELETE"
        })
        this.setState({ todos: this.state.todos.filter(todo => todo._id !== id)});
        //this.componentDidMount();
    };


    completTodo = async (id, complete) => {
        await fetch("/api/todos", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ _id:id, complete: !complete})
        })
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo._id===id){return{...todo,complete:!todo.complete};} 
                else{return todo;}
            })
        });
        //this.componentDidMount();
    };




    addweather = async (location, today, forecast, isLoading) => {
        this.setState({ 
            location: {_id: this.state.location._id, text: location},
            today: today,
            forecast: forecast,
            isLoading: isLoading});
            
        await fetch("/api/location", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ _id: this.state.location._id, text: location})
        })
        
    };

    updateTempType = ( Type ) => {
        this.setState( { tempType: Type } );
        if ( localStorage ) {
          localStorage.setItem('react-weather-app.temperature', Type );
        }
      };

    checkforcast = () => {
        var weatherData = this.state.forecast;
        var bank = [];
        var newData = weatherData.filter((day) => {
            var ApiDate = moment.unix(day.dt).date();
            if (bank.indexOf(ApiDate) > -1){
                return false;
            } else {
                bank.push(ApiDate);
                return true;
            };
        });
        return newData.map(
            (day) => {
            day.date_text = moment.unix(day.dt).format('dddd, MMM D');
            var sameday = weatherData.filter(weather_day => (moment.unix(weather_day.dt).date() === moment.unix(day.dt).date()));
            var sametemp = sameday.map(weather_day => weather_day.main.temp);
            sametemp.sort(); 
            day.min_temp = sametemp[0];
            day.max_temp = sametemp[sametemp.length-1];
            return day
        });  
    };

    render () {
        let todos = [];
        let forecast = this.checkforcast();
        if (this.state.todoToShow==="all"){
            todos = this.state.todos;
        }else if (this.state.todoToShow==="active"){
            todos = this.state.todos.filter(todo => !todo.complete);
        }else if (this.state.todoToShow==="completed"){
            todos = this.state.todos.filter(todo => todo.complete);
        }
        let deadtodos = [];
        if (this.state.todos.length!==0){
            let nocompletetodos = this.state.todos.filter(todo => {
                let todo_date = new Date(todo.date);
                todo_date.setHours( todo_date.getHours() + 16 );
                let today_date = new Date();
                return (!todo.complete && todo_date >= today_date)});
            if (nocompletetodos.length!==0){
                deadtodos = nocompletetodos.filter(todo => todo.date === nocompletetodos[0].date);
            }
        }

        return(
        <BrowserRouter>
        <div className="todo-app__root">
            <Header />
            <Switch>
                <Route exact path="/" component={() =>
                    <Home todos={deadtodos}/>
                }/>
                <Route path="/weather" component={() =>
                    <Weather 
                        addweather={this.addweather} 
                        today={this.state.today} 
                        forecast={this.state.forecast}
                        location={this.state.location.text}
                        isLoading={this.state.isLoading}
                        tempType={this.state.tempType}
                        updateTempType={this.updateTempType}/>
                }/>
                <Route path="/deadline" component={() =>
                    <div className="todo-app__home">
                        <Section 
                            todos={todos}
                            add={this.addTodo} 
                            length={this.state.todos.length}  
                            completTodo={this.completTodo}
                            deleteTodo={this.deleteTodo}/>
                        <Footer 
                            todos={this.state.todos}
                            update={this.updateShow}
                            removeAll={this.removeAllcomplete}
                            show={this.state.todoToShow}/>
                    </div>
                }/>

                <Route path="/calendar" component={() =>
                    <Calendar 
                        todos={this.state.todos}
                        forecast={forecast}
                        tempType={this.state.tempType}/>
                }/>
                <Route render={() => <h1>Not Found.</h1>} />
            </Switch>
        </div>
        </BrowserRouter>
        );
    };
}

export default TodoList;