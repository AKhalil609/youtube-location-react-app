import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import './marker.css';


// Map marker
const AnyReactComponent = () => <div className={"pin1"}></div>;

/**
 * Map component that uses google maps api
 *
 * @export
 * @class index
 * @extends {Component}
 */
export default class index extends Component {
    constructor(props) {
        super();
        
        this.state = {
          loading: true,
          lat: 59.955413,
          lng: 30.337844,
          center:{
            lat: props.location.lat,
            lng: props.location.lng
          },
          zoom: 5
        };
      }
    
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '45%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBOy5c8bsrLZwYSlVo0U4b3wQiDsqosNr8" }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                onClick={this.props.changeLocation}
              >
                <AnyReactComponent
                  lat={this.props.location.lat}
                  lng={this.props.location.lng}
                />
              </GoogleMapReact>
            </div>
          );
    }
}
