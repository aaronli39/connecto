//index.js

const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllUsers,
    createOneUser
} = require('./APIs/users')
const {
    getAllEvents,
    createOneEvent
} = require('./APIs/events')

app.get('/users', getAllUsers);
app.post('/user', createOneUser);
app.get('/events', getAllEvents);
app.post('/event', createOneEvent);
exports.api = functions.https.onRequest(app);