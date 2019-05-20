import WeatherForecastDay from './WeatherForecastDay'
import React from 'react'
import moment from 'moment'



class WeatherForecastList extends React.Component {

	renderDays = () => {
		if (this.props.isLoading) { //if data hasn't loaded yet
			return <h3 className="text-center">Fetching 5-Day Forecast...</h3>;
		};
		
		var tempType = this.props.tempType;
		var weatherData = this.props.forecast;
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

		return newData.map((day, item) => {

			day.date_text = moment.unix(day.dt).format('dddd, MMM D');
			var sameday = this.props.forecast.filter(weather_day => (moment.unix(weather_day.dt).date() === moment.unix(day.dt).date()));
			var sametemp = sameday.map(weather_day => weather_day.main.temp);
			sametemp.sort(); 
			day.min_temp = sametemp[0];
			day.max_temp = sametemp[sametemp.length-1];
			if ( item === 0 ) {
				return (
					<div key={day.dt}>
						<h4 className="forecast-title">Forecast for next 5 days</h4>
						<WeatherForecastDay tempType={tempType} {...day}/>
					</div>
				);
			}
			else {
				return <WeatherForecastDay tempType={tempType} key={day.dt} {...day}/>
			}
		});

	};

	render () {
		return (
			<div>{this.renderDays()}</div>
		);
	};
}

export default WeatherForecastList;
