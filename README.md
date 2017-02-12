# geo-location
## What is geo-location?
 > Returns the address of the geographically closest store from the dataset based upon input location
 
 ![geo-location Demo](./geo-location.gif "geo-location Demo gif")
 
## Table of Contents

* [geo-location](#geo-location)
* [Description](#description)
* [Technology Stack](#technology-stack)
* [Installation](#installation)
* [Operation](#operation)
* [Testing](#testing)
* [APIs used](#apis-used)

## Description 

Upon typing in an address in the proper format, a user fires off an `onKeyDown` event by pressing the enter button. At this point `getNearestLocation` is invoked with `this.state.value` as an argument.  The value is updated `onChange` by an event bound to the input field. After `getNearestLocation` is invoked data from the event is parsed and stored in a data object. A /POST request is then send to and API endpoint with the data object. This /POST request is promisified with axios.

The server receives a /POST request to its `/distance` route and a callback `getLatLong` is invoked. This method assigns `minDistance` to Number.MAX_VALUE and minLocation to undefined. Both of these variables are defined in the outer scope for use in `calculateDistance`. Location information is parsed from the request object and a /GET request to Geocoding API endpoint is made. When the response comes back latitude and longitude are parsed and stored in variables.

A promise is then instantiated and `loadCsv` is invoked with lat and long variables. This promise is set to resolve in 1 second. After `loadCsv` is invoked a fs readStream is created to read `store-locations.csv`. Relevant headers are set to be read from the stream and for each line, `calculateDistance` is invoked with lat, long, and the data from the CSV line. `calculateDistance` performs operations which determine distance based on longitude and latitude. After these operations are complete, the conditional checks to see if the current distance is less than the current `minDistance`. If this is true `minDistance` and `minLocation` are updated to the current variables. When there are no more lines in the CSV file an `end` event is fired off, which closes the stream.

At this point, our promise resolves and we respond to the client's request with an object containing `minDistance` and `minLocation`. The client receives this response and stores the data in variables, which are then used to `setState`. After the state is updated there is a ternary condition that returns the `MapImage` component when `this.state.lat.length && this.state.long.length` are true. `MapImage` contains attributes, which are used to pass the state as props.

After `MapImage` receives new props the component renders. This component contains and `img` tag, which has a `src` attribute set to the Static Maps API endpoint. The response of this endpoint is a 432X300 map of the location from our dataset nearest to the input address.

## Technology Stack

 * Node/Express
 * React
 * Webpack
 * Babel
 * Bootstrap
 * Mocha/Chai

## Installation

#### Environment dependencies

Set environment variables:
* [APIs used](#apis-used)
```sh
# open the following file
nano ~/.bash_profile
# add the following lines of code to set environment variables
# activate the API and get an API key (get API key from docs referenced in APIs used)
export MAPS_KEY=<insertKey>
export PORT='8080'
# force session to read file
source ~/.bash_profile
```

#### Clone project
Clone repo from github:
```sh
# run git clone
git clone https://github.com/juliusbuckley/geo-location.git
```

#### Project dependencies

Install project dependencies:
```sh
# run install script
npm install
```

## Operation

#### Local development

Install nodemon for dev environment:
```sh
# install nodemon globally 
npm install -g nodemon
```

Start server and transpile with babel-cli:
```sh
# run dev start script
npm run dev:start
```
#### Production

Transpile server folder and start app: 
```sh
# run prod start script
npm start
```

## Searching for nearest store
To search for the nearest store just start typing your current location and the input box will update.

After typing  in the location press the enter button.

The closest store will appear on a google map along with its address and distance.

## Testing 

### Route testing (Must run npm start before testing to build server-dist dir)

Confirm api is working properly and returing Status Code 200

Start server for testing (Make sure server is not running prior to test): 
```sh
# run test script
npm test
```

## APIs used
> Documentation for:
[Google -- Geocoding API](https://developers.google.com/maps/documentation/geocoding/start "Google -- Geocoding API")

> Documentation for:
[Google -- Static Maps API](https://developers.google.com/maps/documentation/static-maps/intro "Google -- Static Maps API")
