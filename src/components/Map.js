/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import {
  withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker
} from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';

Geocode.setApiKey('AIzaSyDicnxFnANR7IMH_JhhBEfJwCrebX3vVj8');
Geocode.enableDebug();

// const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');

class Map extends React.Component {
  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 700,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
    Building: '',
    pincode: ''
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          mapPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          markerPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        },
        () => {
          Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
            (response) => {
              console.log(response);
              const address = response.results[0].formatted_address;
              const addressArray = response.results[0].address_components;
              const city = this.getCity(addressArray);
              const area = this.getArea(addressArray);
              const state = this.getState(addressArray);
              console.log('city', city, area, state);
              this.setState({
                address: (address) || '',
                area: (area) || '',
                city: (city) || '',
                state: (state) || '',
              });
            },
            (error) => {
              console.error(error);
            }
          );
        });
      });
    } else {
      console.error('Geolocation is not supported by this browser!');
    }
  }

  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_2') {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

getArea = (addressArray) => {
  let area = '';
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0]) {
      for (let j = 0; j < addressArray[i].types.length; j++) {
        if (addressArray[i].types[j] === 'sublocality_level_1' || addressArray[i].types[j] === 'locality') {
          area = addressArray[i].long_name;
          return area;
        }
      }
    }
  }
};

getState = (addressArray) => {
  let state = '';
  for (let i = 0; i < addressArray.length; i++) {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_1') {
        state = addressArray[i].long_name;
        return state;
      }
    }
  }
};

onChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
  console.log('Changed ');
};

// eslint-disable-next-line no-unused-vars
onInfoWindowClose = (event) => { };

onMarkerDragEnd = (event) => {
  const newLat = event.latLng.lat();
  const newLng = event.latLng.lng();

  Geocode.fromLatLng(newLat, newLng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      const addressArray = response.results[0].address_components;
      const city = this.getCity(addressArray);
      const area = this.getArea(addressArray);
      const state = this.getState(addressArray);
      this.setState({
        address: (address) || '',
        area: (area) || '',
        city: (city) || '',
        state: (state) || '',
        markerPosition: {
          lat: newLat,
          lng: newLng
        },
        mapPosition: {
          lat: newLat,
          lng: newLng
        },
      });
    },
    (error) => {
      console.error(error);
    }
  );
};

onPlaceSelected = (place) => {
  console.log('place Selected');
  const address = place.formatted_address;
  const addressArray = place.address_components;
  const city = this.getCity(addressArray);
  const area = this.getArea(addressArray);
  const state = this.getState(addressArray);
  const latValue = place.geometry.location.lat();
  const lngValue = place.geometry.location.lng();

  console.log('latvalue', latValue);
  console.log('lngValue', lngValue);

  // Set these values in the state.
  this.setState({
    address: (address) || '',
    area: (area) || '',
    city: (city) || '',
    state: (state) || '',
    markerPosition: {
      lat: latValue,
      lng: lngValue
    },
    mapPosition: {
      lat: latValue,
      lng: lngValue
    },
  });
};

render() {
  const mapStyles = {
    width: '100%',
    height: '100vh',
  };
  const AsyncMap = withScriptjs(
    withGoogleMap(
      () => (
        <GoogleMap
          defaultZoom={this.state.zoom}
          style={mapStyles}
          defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
        >
          {/* InfoWindow on top of marker */}

          {/* Marker */}
          <Marker
            google={this.props.google}
            name="Dolores park"
            draggable
            onDragEnd={this.onMarkerDragEnd}
            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
          />
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
            </div>
          </InfoWindow>
          <Marker />

          {/* <MarkerWithLabel
                      position={{ lat: -34.397, lng: 150.644 }}
                      labelAnchor={new google.maps.Point(0, 0)}
                      labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
                  >
                      <div>Hello There!</div>
                  </MarkerWithLabel> */}

          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              width: '50%',
              height: '40px',
              paddingLeft: '16px',
              position: 'absolute',
              top: '150px',
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={['(regions)']}
          />
        </GoogleMap>
      )
    )
  );

  return (
    <div>
      <AsyncMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDicnxFnANR7IMH_JhhBEfJwCrebX3vVj8&libraries=places"
        loadingElement={
          <div style={{ height: '100%' }} />
              }
        containerElement={
          <div style={{ height: this.state.height }} />
              }
        mapElement={
          <div style={{ height: '100%', width: '100%', }} />
              }
      />

    </div>
  );
}
}

export default Map;
