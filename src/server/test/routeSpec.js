import app from '../app.js';
import request from 'supertest';
import { expect } from 'chai';

const search = '1770 Union St, San Francisco, CA 94115';
const searchArray = search.split(',');
const data = {
  address: searchArray[0],
  city: searchArray[1].substring(1),
  state: searchArray[2].split(' ')[1],
  zip: searchArray[2].split(' ')[2]
};

describe('POST /distance', () => {
  it('should return 200 to confirm request are sent to distance', done => {
    request(app)
      .post('/distance')
      .send(data)
      .expect(200, done);
  });
});
   