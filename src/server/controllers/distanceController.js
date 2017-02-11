import fs from 'fs';
import axios from 'axios';
import cvs from 'fast-csv';
import qs from 'qs';
// SEND HTTP REQUEST
let minDistance = Number.MAX_NUM;
let minLocation;

const calculateDistance = (lat1, lat2, end) => {
  const lat2 = end.Latitude;
  const long2 = end.Longitude;
  // distance calculation from http://www.movable-type.co.uk/scripts/latlong.html
  const R = 6371e3;
  const φ1 = lat1.toRadians();
  const φ2 = lat2.toRadians();
  const Δφ = (lat2 - lat1).toRadians();
  const Δλ = (lon2 - lon1).toRadians();

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  if (d < minDistance) {
    minDistance = d;
    minLocation = end;
  }
};

const loadCsv = (starLat, startLong) => {
  const stream = fs.createReadStream('store-locations.csv');
  cvs
    .fromStream(stream, { headers: [, , 'Address', 'City', 'State', 'Zip Code', 'Latitude', 'Longitude', , ] })
    .on('data', data => {
      calculateDistance(startLat, startLong, data);
    })
    .on('end', () => {
      console.log('done');
    });
};

const getLatLong = (req, res) => {
  const location = {
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  };
  const searchUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const parameters = {
    address: `${location.address} ${location.city} ${location.state} ${location.zip}`,
    key: process.env.MAP_API
  };
  const apiUrl = searchUrl + qs.stringify(parameters);
  axios.get(apiUrl)
    .then(result => {
      const lat = result.data.results.geometry.location.lat;
      const long = result.data.results.geometry.location.long;
      loadCsv(lat, long);
      console.log('min', minDistance);
      res.send('data');
    })
    .catch(error => { 
      if (error.response) {
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else {
        console.error('Message:', error.message);
      }
      console.error('Config:', error.config);
    });
};

export { getLatLong, loadCsv, calculateDistance };