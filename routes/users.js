const express = require('express');
const router = express.Router();

const db = require('../models/database');
const users = require('../models/User');

//pega o db e collection users e retorna para usersDB
usersDB = db.connectDB;
usersDB = usersDB.users;

router.get('/', (req, res) => {
	users = usersDB.find();
	res.json(users);
})

router.post('/cadastrar', (req, res) => {
	const user = req.body;
	usersDB.insertOne(user);
	res.json(user);
})

router.get('/byName', (req, res) => {
	const nameToFind = req.body;
	const usersByName = await buscarNomeUsuario(nameToFind);
	res.json(usersByName);
})

router.get('/byEmail', (req, res) => {
	const emailToFind = req.body;
	const userByEmail = await buscarEmailUsuario(emailToFind);
	res.json(userByEmail);
})

//meesmo problema da funcao update
router.post('/deletar', (req, res) => {
	const userToDelete = req.body;
	await deletarUsuario(userToDelete);
	res.json(userToDelete);
})

//preciso terminar isso, funcao de update no models esta recebendo como parametro nome e email
router.post('/atualizar', (req, res) => {
	const userNewData = req.body;
	await atualizarUsuario(userNewData);
	res.json(userNewData);
})


module.exports = router;
