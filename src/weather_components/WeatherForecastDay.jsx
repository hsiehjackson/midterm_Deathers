import React from 'react'
import moment from 'moment'
class WeatherForecastDay extends React.Component {
	render () {
		var location = this.props.location;
		var weather = this.props.weather[0];
		var tempType = this.props.tempType;
		var date = moment.unix(this.props.dt).format('dddd, MMM D');
		var time;
		if (this.props.dt_txt){
			time = this.props.dt_txt.split(" ")[1].split(":");
			let newhour = (parseInt(time[0])+8);
			let split_date;
			if (newhour > 24){
				newhour = newhour - 24;
			}
			time =  newhour + ":" + time[1];
		}
		else{
			var today = new Date();
			time = today.getHours() + ":" + today.getMinutes();
		}
		var temp_min = this.props.main.temp_min;
		var temp_max = this.props.main.temp_max;

		if (tempType === 'C') {
			temp_min = ((temp_min - 32) * (5/9)).toFixed(1);
			temp_max = ((temp_max - 32) * (5/9)).toFixed(1);
			//temp = ((temp - 32) * (5/9)).toFixed(1);
		}
		else {
			temp_min = temp_min.toFixed(1);
			temp_max = temp_max.toFixed(1);
		}

		return(
				<div className="row">
					<div className="small-10 small-centered column">
						<div className="forecast-container">
							<h4 className="weather-card-title">{time}, {date}<br />{location}</h4>
							<div className="weather-card">
								<div className="weather-card-icon-div">
									<i className={`wi wi-owm-${weather.id} weather-card-icon`} />
								</div>
								<div className="column weather-card-word">
									{temp_min} - {temp_max}&deg;{tempType}
									<br />
									{weather.description}
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	};
}



export default WeatherForecastDay;
