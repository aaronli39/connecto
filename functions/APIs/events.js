//events.js

const { db } = require('../util/admin');

exports.getAllEvents = (request, response) => {
	db
		.collection('events')
		.get()
		.then((data) => {
			let todos = [];
			data.forEach((doc) => {
				todos.push(doc.data());
			});
			return response.json(todos);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};