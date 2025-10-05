const { getDB } = require('../config/connectDB');

class Users {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}

	async function cadastrar() {
		const db = getDB();
		const usersDB = db.collection('users');

		return await usersDB.insertOne({ name: this.name, email: this.email });
	}

	async function buscarNome(nome) {
		const db = getDB();
		const usersDB = db.collection('users');
		
		return await usersDB.find({ name: nome }).toArray();
	}

	async function buscarEmail(userEmail) {
		const db = getDB();
		const usersDB = db.collection('users');
		
		return await usersDB.find({ email: userEmail }).toArray();
	}

	async function deletarUsuario(name, email) {
		const db = getDB();
		const usersDB = db.collections('users');

		return await usersDB.deleteOne({ name: name, email: email });
	}
}

module.exports = { cadastrar,  buscarNome, buscarEmail, deletarUsuario };
