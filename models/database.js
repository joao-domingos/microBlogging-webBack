const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

let client;
let database;
const projectDB = "microblogging";

async function connectDB() {
	if (!client) {
		client = new MongoClient(uri);
		await client.connect();
		database = client.db(projectDB);
		console.log("conectado ao db");
	}
	return database;
}

module.exports = { connectDB };
