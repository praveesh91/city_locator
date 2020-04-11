import React, { PureComponent } from "react";

import Geocode from "react-geocode";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends PureComponent {

  constructor(props) {
    super(props);
    
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      cities: [],
      coordinates: [],
      city : []
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentDidMount(props){
      this.setCoordinates(props)
  }

  setCoordinates(props){

    console.log("called setcoordinates")

    this.props.cities.map((event, index) =>{

        Geocode.setApiKey("AIzaSyAW4mUGkkn09URppxeMpfR-Fz1k6kRVzFc");
        Geocode.setLanguage("en");
        Geocode.enableDebug();
        Geocode.fromAddress(event.City)
        
        .then(response => {
          const data = response.results[0].geometry.location
          console.log(data)
          const latitude = data.lat
          const longitude = data.lng

          // this.setState({
          //   coordinates: [...this.state.coordinates, data.lng]
          //   }, ()=>console.log("object"))     

          return  (
            <Marker
              position={{lat: latitude, lng: longitude}} 
              />
          ) 
        })

    })


    
}

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  
  render(props) {
    
    console.log(this.state.city)

    // {this.setCoordinates()}
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Map
          style={{
            minWwidth: "95%",
            minHeight: "200px"
          }}
          google={this.props.google}
          zoom={4}
          initialCenter={{
            lat: 20.5937,
            lng: 78.9629
          }}
        >
            <Marker
              position={{lat: 20.5937, lng: 78.9629}} 
            />
          {this.setCoordinates()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAm3EVXc70Hu9ZpTGEaIARDZ9VYS0p0D_s",
  v: "3"
})(MapContainer);
