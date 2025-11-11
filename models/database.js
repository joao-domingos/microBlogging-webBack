const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

let client;
let db;
const database = "microblogging";

async function connectDB() {
	if (!client) {
		client = new MongoClient(uri);
		await client.connect();
		db = client.db(database);
		console.log("conectado ao db");
	}
	return db;
}

module.exports = { connectDB };
