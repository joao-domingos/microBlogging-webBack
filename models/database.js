const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

let client;
async function connectDB() {
	if (!client) {
		client = new MongoClient(uri);
		await client.connect();
		console.log("conectado ao db");
	}
	return client.db("microblogging");
}

module.exports = { connectDB };
