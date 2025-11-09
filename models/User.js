const database = require('./database');
const logger = require('./logger');

const usersDB = database.users;

async function cadastrarUsuario(name, email) {
	if (!name && !email) {
		throw new Error("todos os campos sao obrigatorios");
	}
	if (!email.includes("@")) {
		throw new Error("email invalido");
	}
	const user = new User(name, email);
	try {
		await usersDB.insertOne({ name: this.name, email: this.email });
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
		const usersByName = await usersDB.find({ name: nome }).toArray();
		
		if (usersByName.length === 0) {
			console.log("nenhum usuario cadastrado");
			return;
		}

		console.log(`lista de usuarios com nome ${nome}`);
		for (const users of usersByName) {
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
	if (!email.includes("@")) {
		throw new Error("email invalido");
	}
	try {
		const userByEmail = await usersDB.find({ email: userEmail }).toArray();
		
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
		throw new Error("os dois campos sao obrigatórios");
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
		await usersDB.deleteOne({ name: name, email: email });
		console.log(`usuario ${email} deletado com sucesso`);
	}
	catch (error) {
		console.log("erro ao deletar usuario");
		logger(error);
	}
}

async function atualizarUsuario(nome, email) {
    	if (!name || !email) {
		throw new Error("os dois campos sao obrigatórios");
	}
	
	try {
	    await usersDB.updateOne({ nome, email }, { $set: { updateAt: new Date() } });
	    console.log("usuario atualizado");
	}
	catch (error) {
	    console.log("erro ao atualizar curtida");
	    logger(error);
	}
}  

module.exports = { cadastrarUsuario, buscarNomeUsuario, buscarEmailUsuario, deletarUsuario, atualizarUsuario };

