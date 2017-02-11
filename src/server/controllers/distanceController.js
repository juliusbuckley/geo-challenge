import fs from 'fs';
import axios from 'axios';
import cvs from 'fast-csv';
import qs from 'qs';

let minDistance = Number.MAX_VALUE;
let minLocation = 'async';
const calculateDistance = (lat1, long1, end) => {
  const lat2 = end.Latitude;
  const long2 = end.Longitude;
  // distance calculation from http://stackoverflow.com/a/38549345
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(long2 - long1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * 
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const d = 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  if (d < minDistance) {
    minDistance = d;
    minLocation = end;
  }
};
const loadCsv = (lat, long) => {
  const stream = fs.createReadStream('store-locations.csv');
  cvs
    .fromStream(stream, { headers: [, , 'Address', 'City', 'State', 'Zip Code', 'Latitude', 'Longitude', , ] })
    .on('data', data => {
      calculateDistance(lat, long, data);
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
    key: process.env.MAPS_KEY
  };
  const apiUrl = searchUrl + qs.stringify(parameters);
  axios.get(apiUrl)
    .then(result => {
      const lat = result.data.results[0].geometry.location.lat;
      const long = result.data.results[0].geometry.location.lng;
      const promise = new Promise(resolve => {
        loadCsv(lat, long);
        setTimeout(() => resolve('Success'), 1000);
      });
      promise
        .then((value) => {
          res.send({ minDistance, minLocation });
        });
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