import React from 'react'

const google = window.google;

class GoogleAutocomplete extends React.Component {
	componentDidMount = () => {
		const { types=['(cities)'] } = this.props;
		this.autocomplete = new google.maps.places.Autocomplete(this.refs.location, {
		  types,
		});
		this.autocomplete.addListener('place_changed', this.onSelected);
	};

	onSelected = () => {
		if (this.props.onPlaceSelected) {
			this.props.onPlaceSelected(this.autocomplete.getPlace());
		}
	};

	getLocation = () => {
		return this.refs.location.value;
	};

	clearLocation = () => {
		this.refs.location.value = '';
	};

	render () {
		return (
			<div>
				<input className="custom-search-class" type="search" placeholder="Search weather by city" ref="location"/>
			</div>
		);
	};
}

export default GoogleAutocomplete;
