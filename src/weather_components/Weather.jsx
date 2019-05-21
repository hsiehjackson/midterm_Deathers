import React from 'react'
import WeatherForm from './WeatherForm'
import WeatherForecastDay from './WeatherForecastDay'


var openWeatherMap = require('./api/openWeatherMap.jsx');

class Weather extends React.Component {
    handleSearch =  async (location) => {
      let currentWeather;
      let forecastWeather;
      let error = false;
      try {
        currentWeather = await openWeatherMap.getWeather('weather', location);
      } catch (e) {error=true; alert('No this place!');}
      try {
        forecastWeather = await openWeatherMap.getWeather('forecast', location);
      } catch (e) {}
      if (!error){
        this.props.addweather(location, currentWeather, forecastWeather.list, false);
      }
    };
    
    renderMessage = () => {
      if (this.props.location!=="" && this.props.isLoading) {
        return (<h3 className="text-center">Fetching Weather...</h3>);
      } 
      else if (this.props.today && this.props.location) {
        console.log(this.props.today)
        console.log(this.props.forecast)
        let today = this.props.today;
        let today_date = new Date();
        let hh = today_date.getHours();
        let dd = today_date.getDate()
        let count = 0;
        let today_forecast = this.props.forecast.filter((day) => 
          {
            if (((day.dt_txt.split(" ")[0].split("-")[2] > dd) 
                || ((parseInt(day.dt_txt.split(" ")[1].split(":")[0])+8 > hh) && (day.dt_txt.split(" ")[0].split("-")[2] == dd)))
                && count < 5){
              count = count + 1;
              return true;
            }
            return false;
          });
        today_forecast.unshift(today);
        let location = this.props.today.name + ", " + this.props.today.sys.country;

        return (
          today_forecast.map(
            (day) => 
            <WeatherForecastDay 
              tempType={this.props.tempType} 
              key={day.dt} 
              location={location}
              {...day}/>
          )
          
        );
      }
    };

    render () {
      return (
        <div  className="weather-form">
          <WeatherForm onSearch={this.handleSearch} onTypeChange={this.props.updateTempType} tempType={this.props.tempType}/>
          <div className="weather-display">
            {this.renderMessage()}
          </div>
        </div>
      );
    };
}

export default Weather;
