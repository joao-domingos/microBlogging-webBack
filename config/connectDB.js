const MongoClient = require('mongodb').MongoClient;

let db;
let client;

async function connectDB() {
	client = new MongoClient('mongodb://localhost:27017');
	await client.connect();
	db = client.db('microblogging');
	console.log('conectado ao db');
}

async function desconnectDB() {
	if (client) {
		await client.close();
		console.log("desconectado do db");
	}
}

function getDB() {
	if (!db) throw new Error('banco de dados nao inicializado');
	return db;
}

module.exports = { connectDB, getDB };
