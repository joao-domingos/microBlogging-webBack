const express = require('express');
const router = express.Router();

const db = require('../models/database');
const users = require('../models/User');

usersDB = db.connectDB;

router.get('/', (req, res) => {
	usersList = usersDB.find();
	res.json(users);
})

router.post('/', (req, res) => {
	const user = req.body;
	usersDB.insertOne(user);
	res.json(user);
})

router.get('/byName', (req, res) => {
	const nameToFind = req.body;
	const usersByName = [];
	if (!nameToFind) {
		res.json("necessario incluir um nome");
	}
	usersByName = buscarNomeUsuario(nameToFind);
	res.json(usersByName);
})


module.exports = router;
