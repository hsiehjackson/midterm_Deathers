const axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/';
const DEFAULT_UNIT = 'imperial';
const API_KEY = '37f2cdbe2f7491c17e0724316ffe4d70';

module.exports = {
	getWeather: function (key, location) {
		// if key === 'weather' : returns current weather
		// if key === 'forecast' : returns 5 day forecast
		var isZipCode = /^\d{5}$/.test(location);
		var apiKey = process.env.API_KEY || API_KEY;
		const encodedLocation = encodeURIComponent(location);

		var requestUrl = `${OPEN_WEATHER_MAP_URL}${key}?appid=${apiKey}&units=${DEFAULT_UNIT}`;
		requestUrl += isZipCode ? `&zip=${encodedLocation},us` : `&q=${encodedLocation}`;

		return axios.get(requestUrl).then(function (res) {
			const apiDataHasError = res.data.cod !== '200';
			if (apiDataHasError && res.data.message) { //if true, something went wrong
				alert('no this place'); //send to error handler in Weather.jsx
			} else {
				return res.data; //send to success case in Weather.jsx
			}
		})
	}
};
