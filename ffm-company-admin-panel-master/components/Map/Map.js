import { Component } from "react";
// import ReactMapGL, {Marker} from 'react-map-gl';

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// import Pin from './Pin';
const mapStyles = {
  width: "100%",
  height: "100%",
};

class Map2 extends Component {
  constructor(props) {
    super(props);
  }

  onMarker = (val) => {
    this.props.onMarkerChange(val);
  };

  // state = {
  //   viewport: {
  //     marginLeft:'30px',
  //     width: '700px',
  //     height: '300px',
  //     latitude: 23.8103,
  //     longitude: 90.4125,
  //     selectedLat: 23.8103,
  //     selectedLong: 90.4125,
  //     showMarker: true,
  //     zoom: 10
  //   }
  // };
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    showMarker: true,
    showMarkerOnly:this.props.showMarkerOnly
  };

  getMapInfo = (e) => {
    console.log(e);
    // this.setState({ selectedLat: e.lngLat[1], selectedLong: e.lngLat[0] });
    // this.onMarker(`${e.lngLat[1]}, ${e.lngLat[0]}`);
    // this.setState({ showMarker: true });
  };
  

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{ lat: this.props.assigned_lat, lng: this.props.assigned_long }}
       
      >
       {this.state.showMarkerOnly ? <Marker latitude={this.props.assigned_lat} longitude={this.props.assigned_long}  >
   
       </Marker> : ""}
      </Map>

      // <ReactMapGL
      //   mapStyle="mapbox://styles/mapbox/streets-v9"
      //   mapboxApiAccessToken="pk.eyJ1Ijoic2hhaGVkbWVoYnViIiwiYSI6ImNqdHdxdjhlNjBxY3o0M3BnMWRpMXd4azYifQ.QQnUDA2XwX30o9XTwuEdIQ"
      //   onViewportChange={(viewport) => this.setState({ viewport })}
      //   {...this.state.viewport}
      //   onClick={(e) => this.getMapInfo(e)}
      // >
      //   {this.state.showMarker ? <Marker latitude={this.state.selectedLat} longitude={this.state.selectedLong} offsetLeft={-20} offsetTop={-10} >
      //     <Pin size={30} onClick={() => this.setState({ popupInfo: "sdf" })}/>
      //   </Marker> : ""}

      //   {this.props.showMarkerOnly ? <Marker latitude={parseFloat(this.props.assigned_lat)} longitude={parseFloat(this.props.assigned_long)} offsetLeft={-20} offsetTop={-10} >
      //     <Pin size={30} onClick={() => this.setState({ popupInfo: "sdf" })}/>
      //   </Marker> : console.log('noooooooooooo pin')}
      // </ReactMapGL>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBMrCK_LhbcOJEQMMMmf3iPdzo_pfMHIUw",
})(Map2);
