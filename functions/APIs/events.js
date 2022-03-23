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

exports.createOneEvent = (request, response) => {   
    const newUser = {
        Artist: request.body.Artist,
        Date: request.body.Date,
        Venue: request.body.Venue,
    }

    db
        .collection('events')
        .add(newUser)
        .then((doc)=>{
            const responseTodoItem = newUser;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};