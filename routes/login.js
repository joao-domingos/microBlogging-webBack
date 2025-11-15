const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/register/:email/:pwd', async (req, res) => {
	try {
		const userCred = {
			email: req.params.email,
			pwd: req.params.pwd,
		};

		const userQuery = await User.buscarEmailUsuario(userCred.email);

		if (userQuery) {
			return res.json({ message: "this email is already in use, try to remember your password and login in auth/login" });
		}

		res.json({ 
			message: "register successfully, now login in auth/login",
			user: userCred,
		});
		
	}
	catch (error) {
		res.json({ 
			error: error.message,
		});
	}
})

router.post('/login/:email/:pwd', async (req, res) => {
	try {
		const userCred = {
			email: req.params.email,
			senha: req.params.pwd,
		};

		const userQuery = await User.buscarEmailUsuario(email);

		if (!userQuery) {
			return res.json({ erro: "user not found, try again or register at auth/register" })
		}

		req.session.user = {
			id: user._id,
			email: user.email,
		};

		res.json({ message: 'login successfully', user: req.session.user });
	}
	catch (error) {
		res.json({ 
			message: 'error logging in',
			error: error.message,
		})
	}
});

router.post('/logout', (req, res) => {
	req.session.destroy();
	res.json({ message: 'logout successfully' });
});

module.exports = router;
