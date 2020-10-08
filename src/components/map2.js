import React, { useState, useEffect } from "react";
import {
  withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyDicnxFnANR7IMH_JhhBEfJwCrebX3vVj8');
Geocode.enableDebug();

const Map = () => {
  const [address, SetAddress] = useState("");
  const [city, SetCity] = useState("");
  const [area, SetArea] = useState("");
  const [mapPosition, SetmapPosition] = useState({
    lat: this.props.center.lat,
    lng: this.props.center.lng
  });
  const [markerPosition, SetmarkerPosition] = useState({
    lat: this.props.center.lat,
    lng: this.props.center.lng
  });
 
    
  
  useEffect(() => {
    Geocode.fromLatLng(mapPosition.lat, mapPosition.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;
        const city = this.getCity(addressArray);
        const area = this.getArea(addressArray);
        const state = this.getState(addressArray);

        console.log('city', city, area, state);

        setState({
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
  }, [])


  
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat
   || this.state.address !== nextState.address
   || this.state.city !== nextState.city
   || this.state.area !== nextState.area
   || this.state.state !== nextState.state
    ) {
      return true;
    } if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  };

  /**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = (addressArray) => {
   let city = '';
   for (let i = 0; i < addressArray.length; i++) {
     if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_2') {
       city = addressArray[i].long_name;
       return city;
     }
   }
 };

 /**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
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

 /**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
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



 /**
  * And function for city,state and address input
  * @param event
  */
 onChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };

 /**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = (event) => {
 };

 /**
  * When the user types an address in the search box
  * @param place
  */
 onPlaceSelected = (place) => {
   const address = place.formatted_address;
   const addressArray = place.address_components;
   const city = this.getCity(addressArray);
   const area = this.getArea(addressArray);
   const state = this.getState(addressArray);
   const latValue = place.geometry.location.lat();
   const lngValue = place.geometry.location.lng();
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

 /**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onMarkerDragEnd = (event) => {
   console.log('event', event);
   const newLat = event.latLng.lat();
   const newLng = event.latLng.lng();
   const addressArray = [];
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
         state: (state) || ''
       });
     },
     (error) => {
       console.error(error);
     }
   );
 };

   const AsyncMap = withScriptjs(
     withGoogleMap(
       (props) => (
         
         <GoogleMap
           google={this.props.google}
           defaultZoom={this.props.zoom}
           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
         >
           {/* For Auto complete Search Box */}
           <Autocomplete
             style={{
               width: '100%',
               height: '40px',
               paddingLeft: '16px',
               marginTop: '2px',
               marginBottom: '100px'
             }}
             onPlaceSelected={this.onPlaceSelected}
             types={['(regions)']}
           />
           {/* Marker */}
           <Marker
             google={this.props.google}
             name="Dolores park"
             draggable
             onDragEnd={this.onMarkerDragEnd}
             position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
           />
           <Marker />
           {/* InfoWindow on top of marker */}
           <InfoWindow
             onClose={this.onInfoWindowClose}
             position={{ lat: (markerPosition.lat + 0.0018), lng: markerPosition.lng }}
           >
             <div>
               <span style={{ padding: 0, margin: 0 }}>{ address }</span>
             </div>
           </InfoWindow>
         </GoogleMap>
       )
     )
   );
   let map;
   if (this.props.center.lat !== undefined) {
     map = (
       <div>
         
         <AsyncMap
           googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDicnxFnANR7IMH_JhhBEfJwCrebX3vVj8&libraries=places"
           loadingElement={
             <div style={{ height: '100%' }} />
      }
           containerElement={
             <div style={{ height: this.props.height }} />
      }
           mapElement={
             <div style={{ height: '100%' }} />
      }
         />
       </div>
     );
   } else {
     map = <div style={{ height: this.props.height }} />;
   }
   return (map);
 }
export default Map;
