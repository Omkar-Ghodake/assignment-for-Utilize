const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// api for todos
router.get('/todos', async (req, res) => {
	const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
	const response = await fetch(todosUrl, {
		'method': 'GET'
	});
	const json = await response.json();
	await json.forEach(element => {
		delete element.userId;
	});
	res.json({ json });
});

// api for user appended with their todos
router.get('/user/:id', async (req, res) => {
	const usersUrl = `https://jsonplaceholder.typicode.com/users/${req.params.id}`;
	const users = await fetch(usersUrl, {
		method: 'GET'
	});
	let usersJson = await users.json();

	const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
	const response = await fetch(todosUrl, {
		'method': 'GET'
	});
	const todosJson = await response.json();


	let todosArray = []
	await todosJson.forEach(element => {
		if (element.userId === usersJson.id) {
			todosArray.push(element);
		};
	});

	usersJson.todos = todosArray;
	res.json({ usersJson });
});


module.exports = router;