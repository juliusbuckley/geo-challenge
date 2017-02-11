import React, { Component } from 'react';
import axios from 'axios';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      nearest: ''
    };
    this.focusInputonKeyDown = this.focusInputonKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }
  componentWillMount() {
    document.addEventListener('keydown', this.focusInputonKeyDown);
  }
  getNearestLocation(search) {
    const searchArray = search.split(',');
    const data = {
      address: searchArray[0],
      city: searchArray[1].substring(1),
      state: searchArray[2].split(' ')[1],
      zip: searchArray[2].split(' ')[2]
    };
    axios.post('/distance', data)
      .then(nearestLocation => {
        this.setState({nearest: nearestLocation.data});
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
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  submitInput(e) {
    if (e.keyCode === 13) {
      this.getNearestLocation(e.target.value);
    }
  }
  focusInputonKeyDown() {
    const input = document.querySelector('input[type=text]');
    input.focus();
  }
  render() {
    return (
      <div onKeyDown={ this.focusInputonKeyDown }>
        <h1>geo-location</h1>
        <span className='icon'></span>
        <span className='search'></span>
        <input type='text' value={ this.state.value } placeholder='1770 Union St, San Francisco, CA 94115' onKeyDown={ this.submitInput } onChange={ this.handleChange } />
      </div>
    );
  }
}