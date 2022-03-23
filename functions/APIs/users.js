//users.js

const { db } = require('../util/admin');

exports.getAllUsers = (request, response) => {
	db
		.collection('users')
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

exports.createOneUser = (request, response) => {   
    const newUser = {
        Biography: request.body.Biography,
        City: request.body.City,
        Country: request.body.Country,
        Email: request.body.Email,
        FirstName: request.body.FirstName,
        LastName: request.body.LastName,
        Phone: request.body.Phone,
        ProfileImage: request.body.ProfileImage,
    }

    db
        .collection('users')
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