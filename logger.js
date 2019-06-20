'use strict';
const Q = require('@nmq/q/client');

const db = new Q('database');
const file = new Q('file');

file.subscribe('file-save', (payload) => {
  console.log('File saved', payload);
});

file.subscribe('file-error', (payload) => {
  console.error('File error', payload);
});

const dbEvents = ['create', 'read', 'update', 'delete'];

dbEvents.forEach(event => {
  db.subscribe(event, payload => {
    console.log(`${event} happened`);
  });
});
