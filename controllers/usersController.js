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


