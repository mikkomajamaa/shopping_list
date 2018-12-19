const Promise = require('bluebird');
const request = require('supertest');
const localmongoose = require('mongoose');

localmongoose.Promise = Promise;
const app = require('../app');
const Note = require('../models/note.js');

describe('Test Mongoose database connection', () => {
  test('Test connection', (done) => {
    localmongoose.connect('mongodb://mongo:27017').then(() => {
      expect(localmongoose.connection.readyState).toBe(1);
    });
    localmongoose.disconnect();
    done(); // eslint-disable-line no-undef
  });
});

describe('Test GET a public test note', () => {
  test('Test if socket is open and routers work with a test note', (done) => {
    request(app).get('/api/notes/public_notes').set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      // Assert other desired stuff
      done();
    });
  });
  // An exercise to the reader: How to validate the JSON structure?
  // See https://www.npmjs.com/package/supertest and promises
});

describe('Test GET all notes', () => {
  test('Test if socket is open and routers work', (done) => {
    request(app).get('/api/notes').set('Accept', 'html/text')
    .expect('Content-Type', /html/)
    .expect(401)
    .then(response => {
      // Assert other desired stuff
      done();
    });
  });
  // An exercise to the reader: How to validate the JSON structure?
  // See https://www.npmjs.com/package/supertest and promises
});
