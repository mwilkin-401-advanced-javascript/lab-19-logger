'use strict';
require('dotenv').config();

const Q = require('@nmq/q/client');

//subscribe to the events in file namespace
const file = new Q('file');
file.subscribe('file-save', (payload) => {
  console.log('File saved', payload);
});

file.subscribe('file-error', (payload) => {
  console.error('File error', payload);
});

//subscribe to event in the database namespace
const db = new Q('database');
const dbEvents = ['create', 'read', 'update', 'delete', 'error'];

dbEvents.forEach(event => {
  db.subscribe(event, payload => {
    console.log(`${event} happened.`, payload);
  });
});

// db.subscribe('create', payload => console.log('`create` event in `db`:', payload));
// db.subscribe('read', payload => console.log('`read` event in `db`:', payload));
// db.subscribe('update', payload => console.log('`update` event in `db`:', payload));
// db.subscribe('delete', payload => console.log('`delete` event in `db`:', payload));
// db.subscribe('error', payload => console.log('`error` event in `db`:', payload));


//see all subscriptions
console.log('database subscriptions:', db.subscriptions());

console.log('file subscriptions:', file.subscriptions());
