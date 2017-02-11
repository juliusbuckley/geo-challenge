import app from '../index.js';
import request from 'supertest';
import { expect } from 'chai';

describe('HTTP /endpoint', () => {
  it('should return 200 to confirm request are sent to endpoint', done => {
    request(app)
      .get(/**/)
      .query(/**/)
      .expect(200, done);
  });
});