import React, { Component } from 'react';
import axios from 'axios';

export default class MapImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      long: this.props.long,
      distance: this.props.distance,
      location: this.props.location.split('-')[0]
    };
  }
  render() {
    return (
      <div>
          <img src=
            {
              `https://maps.googleapis.com/maps/api/staticmap?size=432x300&maptype=satellite&markers=color:blue%7C${ this.state.lat },${ this.state.long }&key=${ process.env.MAPS_KEY }`
            }
          ></img>
          <div>
            <div className='dest'><span className='tags'>Destination:</span> { this.state.location }</div>
            <div className='dist'><span className='tags'>Distance:</span> { this.state.distance } miles</div>
          </div>
        </div>
    );
  }
}