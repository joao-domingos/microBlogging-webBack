const { connectDB } = require('./database');
const logger = require('./logger');

async function queryAllUsers() {
	const db = await connectDB();
	const queryUsers = await db.collection('users').find({}).toArray();
	return queryUsers;
}
	
async function cadastrarUsuario(name, email) {
	if (!name && !email) {
		throw new Error("todos os campos sao obrigatorios");
	}
	if (!email.includes("@")) {
		throw new Error("email invalido");
	}
	const user = new User(name, email);
	try {
		const db = await connectDB();
		await db.users.insertOne({ name: this.name, email: this.email });
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
		const db = await connectDB();
		const usersByName = await db.collection('users').find({ name: nome }).toArray();
		
		return usersByName;
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
		const db = await connectDB();
		const userByEmail = await db.users.find({ email: userEmail }).toArray();
		
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
		const db = connectDB();
		await db.users.deleteOne({ name: name, email: email });
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
		const db = connectDB();
		
		await db.users.updateOne({ nome, email }, { $set: { updateAt: new Date() } });
		console.log("usuario atualizado");
	}
	catch (error) {
		console.log("erro ao atualizar curtida");
		logger(error);
	}
}  

module.exports = { queryAllUsers,
	cadastrarUsuario,
	buscarNomeUsuario,
	buscarEmailUsuario, 
	deletarUsuario, 
	atualizarUsuario };

