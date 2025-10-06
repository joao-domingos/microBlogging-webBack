const { cadastrar, buscarNome, buscarEmail. deletarUsuario } = require('../models/Users');

const logger = require('../utils/logger');

async function cadastrarUsuario(name, email) {
	if (!name || !email) {
		throw new Error("todos os campos sao obrigatorios");
	}
	if (!email.includes("@")) {
		throw new Error("email invalido");
	}
	const user = new User(name, email);
	try {
		await user.cadastrar();
		console.log("cadastrado com sucesso!");
	}
	catch (error) {
		console.log("erro ao cadastrar", error);
		logger(error);
	}	
}

async function buscarNomeUsuario(nome) {
	if (!nome) {
		throw new Error("campo nome obrigatorio");
	}
	if (typeof nome !== "string") {
		throw new Error("nome invalido");
	}
	try {
		const usersByName = await User.buscarNome(nome);
		
		if (usersByName.length === 0) {
			console.log("nenhum usuario cadastrado");
			return;
		}

		console.log(`lista de usuarios com nome ${nome}`);
		for users in usersByName {
			console.log(`${users} - ${usersByName}\n`);
		}
	}
	catch (error) {
		console.log("erro ao buscar usuario pelo nome");
		logger(error);
	}
}

async function buscarEmailUsuario(email) {
	if (!email) {
		throw new Error("campo email obrigatorio");
	}
	if (!email.includes("@") {
		throw new Error("email invalido");
	}
	try {
		const userByEmail = await User.buscarEmail(email);
		
		if (!userByEmail) {
			console.log("email nao cadastrado no sistema");
			return;
		}
		if (userByName.length > 1) {
			throw new Error("email ja cadastro no sistema")
		}

		console.log(`buscando:  ${email}\n`);
		console.log(`name: ${userByEmail.name} email: ${userByEmail.email}`);
	}
	catch (error) {
		console.log("erro ao buscar usuario pelo email");
		logger(error);
	}
}

async function deletarUsuario(name, email) {
	if (!name || !email) {
		throw new Error("os dois campos sao obrigatorios");
	}
	if (!email.includes("@")) {
		throw new Error("email invalido")
	}
	if (typeof name !== "string") {
		throw new Error("nome invalido");
	}

	const toExclude = User.buscarEmail(email);

	if (!toExclude) {
		console.log("nao foi possivel deletar usuario, nao presente no sistema");
	}

	try {
		await toExclude.deletar(name, email);
		console.log(`usuario ${email} deletado com sucesso`);
	}
	catch (error) {
		console.log("erro ao deletar usuario");
		logger(error);
	}
}

module.exports = { cadastrarUsuario, buscarNomeUsuario, buscarEmailUsuario, deletarUsuario };

