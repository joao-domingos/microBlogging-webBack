import { MongoClient } from 'mongodb';

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
