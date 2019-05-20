import React from 'react'
import GoogleAutocomplete from './GoogleAutocomplete'

class WeatherForm extends React.Component {
	onFormSubmit = (e) => {
		e.preventDefault();
		var location = this.refs.googleAutoComplete.getLocation(); //set variable to location value
		if (location.length > 0){ //check for input
			this.refs.googleAutoComplete.clearLocation(); //clear location value
			this.props.onSearch(location); //run the parent onSearch function (inside weather.jsx)
		}
	};

	tempChange = () => {
		var tempType = (this.refs.temp_c.checked) ? 'C' : 'F';
		this.props.onTypeChange(tempType);
	};

	render () {
		var celsiusChecked = { checked: this.props.tempType === 'C' };
		var fahrenheitChecked = { checked: this.props.tempType === 'F' };
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
					<div>
						<GoogleAutocomplete
							style={{width: '90%'}}
							ref="googleAutoComplete"
						/>
					</div>
					<div className="custom-choose">
						<span style={{ marginRight: '12px' }}>Temperature:</span>
						<input
							ref='temp_c'
							onChange={this.tempChange}
							type='radio'
							name='temperature'
							value='C'
							id='temp_c'
							{...celsiusChecked} />
						<label htmlFor='temp_c'>Celsius</label>

						<input
							onChange={this.tempChange}
							type='radio'
							name='temperature'
							value='F'
							id='temp_f'
							{...fahrenheitChecked} />
						<label htmlFor='temp_f'>Fahrenheit</label>
					</div>
					<div>
						<button className='button custom-button-class'>Forecast Weather</button>
					</div>
				</form>
			</div>
		);
	};

}

export default WeatherForm;
