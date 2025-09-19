import { MongoClient } from 'mongodb';

//funcao teste para listar as databases ativas no meu mongodb
async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases();

	console.log("databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function connectDB() {
	const uri = 'mongodb://localhost:27017'
	const client = new MongoClient(uri);
	
	try {
		await client.connect();
		console.log('db connected');
		return client.db();
	} catch (error) {
		console.error('db not connected', error);
		throw error;
	}
}

export { connectDB };
