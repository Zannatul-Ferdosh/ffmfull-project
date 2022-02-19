import React, { Component } from 'react';

import Pin from './Pin';
import ReactMapGL, {Marker} from 'react-map-gl';

class OpenStreet extends Component {


    constructor(props) {
        super(props);
      }


      state = {
    viewport: {
      marginLeft:'30px',
      width: '700px',
      height: '300px',
      latitude: 23.8103,
      longitude: 90.4125,
      selectedLat: 23.8103,
      selectedLong: 90.4125,
      showMarker: true,
      zoom: 10
    }
  };


  onMarker = (val) => {
    this.props.onMarkerChange(val);
  };

  getMapInfo = (e) => {
    console.log(e);
    this.setState({ selectedLat: e.lngLat[1], selectedLong: e.lngLat[0] });
    this.onMarker(`${e.lngLat[1]}, ${e.lngLat[0]}`);
    this.setState({ showMarker: true });
  };
    render() {
        return (
            <div>
                
       <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1Ijoic2hhaGVkbWVoYnViIiwiYSI6ImNqdHdxdjhlNjBxY3o0M3BnMWRpMXd4azYifQ.QQnUDA2XwX30o9XTwuEdIQ"
        onViewportChange={(viewport) => this.setState({ viewport })}
        {...this.state.viewport}
        onClick={(e) => this.getMapInfo(e)}
      >
        {this.state.showMarker ? <Marker latitude={this.state.selectedLat} longitude={this.state.selectedLong} >
          <Pin size={30} onClick={() => this.setState({ popupInfo: "sdf" })}/>
        </Marker> : ""}

        {this.props.showMarkerOnly ? <Marker latitude={parseFloat(this.props.assigned_lat)} longitude={parseFloat(this.props.assigned_long)} >
          <Pin size={30} onClick={() => this.setState({ popupInfo: "sdf" })}/>
        </Marker> : console.log('noooooooooooo pin')}
      </ReactMapGL></div>
         
        );
    }
}

export default OpenStreet;