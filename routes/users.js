const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const users = await User.queryAllUsers(); 
		res.json(users);
	}
	catch (error) {
		res.json({ error: error.message });
	}
})

router.post('/cadastrar', async (req, res) => {
	try {
		const user = await User.cadastrarUsuario(req.body);
		res.json(user);
	}
	catch (error) {
		res.json({ error: error.message });
	}
})

router.get('/byName/:name', async (req, res) => {
	try {
		const name = req.params.name;
		const users = await User.buscarNomeUsuario(name);
		res.json(users);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
})

router.get('/byEmail/:email', async (req, res) => {
	try {
		const email = req.params.email;
		const users = await User.buscarEmailUsuario(email);
		res.json(users);
	}
	catch (error) {
		res.json({ error: error.message });
	}
})

//meesmo problema da funcao update
router.post('/deletar', async (req, res) => {
	const userToDelete = req.body;
	await deletarUsuario(userToDelete);
	res.json(userToDelete);
})

//preciso terminar isso, funcao de update no models esta recebendo como parametro nome e email
router.post('/atualizar', async (req, res) => {
	const userNewData = req.body;
	await atualizarUsuario(userNewData);
	res.json(userNewData);
})


module.exports = router;
