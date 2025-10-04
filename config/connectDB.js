const MongoClient = require('mongodb').MongoClient;

let db;

async function connectDB() {
	const client = new MongoClient('mongodb://localhost:27017');
	await client.connect();
	db = client.db('microblogging');
	console.log('conectado ao mongodb');
}

function getDB() {
	if (!db) throw new Error('banco de dados nao inicializado');
	return db;
}

module.exports = { connectDB, getDB };
