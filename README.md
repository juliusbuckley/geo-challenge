# geo-location
## What is geo-location?
 > Returns the address of the geographically closest store from the dataset based upon input location
 
 ![geo-location Demo](./geo-location.gif "geo-location Demo gif")
 
## Table of Contents

* [geo-location](#geo-location)
* [Technology Stack](#technology-stack)
* [Installation](#installation)
* [Operation](#operation)
* [Testing](#testing)
* [APIs used](#apis-used)

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
