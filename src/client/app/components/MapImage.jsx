import React, { Component } from 'react';

const MapImage = props => (
  <div>
      <img src=
        {
          `https://maps.googleapis.com/maps/api/staticmap?size=432x300&maptype=satellite&markers=color:blue%7C${ props.lat },${ props.long }&key=${ process.env.MAPS_KEY }`
        }
      ></img>
      <div>
        <div className='dest'><span className='tags'>Destination:</span> { props.location }</div>
        <div className='dist'><span className='tags'>Distance:</span> { props.distance } miles</div>

      </div>
    </div>
);

export default MapImage;
