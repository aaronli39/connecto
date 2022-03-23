//index.js

const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllUsers
} = require('./APIs/users')
const {
    getAllEvents
} = require('./APIs/events')

app.get('/users', getAllUsers);
app.get('/events', getAllEvents);
exports.api = functions.https.onRequest(app);