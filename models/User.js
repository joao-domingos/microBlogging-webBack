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
		const userByEmail = await db.collection('users').find({ email: email }).toArray();
		
		return userByEmail;
	}
	catch (error) {
		console.log("erro ao buscar usuario pelo email");
		logger(error);
	}
}

async function deletarUsuario(id) { 
	if (!id) {
		throw new Error("id nao existente");
	}
	try {
		const db = await connectDB();

		const toDelete = db.collection('users').find({ id : id });
		if (!toDelete) {
			throw new Error("id nao encontrado");
		}

		await db.users.deleteOne({ id: id });
		return console.log(`usuario ${id} deletado com sucesso`);
	}
	catch (error) {
		console.log("erro ao deletar usuario");
		logger(error);
	}
}

async function atualizarUsuario(id, args) {
	if (!id) {
		throw new Error("id nao existente");
	}
	try {
		const db = connectDB();

		const toUpdate = await db.collection('users').find({ id: id });
		if (!toUpdate) {
			throw new Error("id nao encontrado");
		}
		
		await db.users.updateOne({ id: id }, { $set: { updateAt: new Date() } });
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

