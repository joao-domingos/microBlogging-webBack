const { connectDB } = require('./models/database');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const tweetRoutes = require('./routes/tweets');

const app = express();
const port = 3000;

async function main() {
	try {
		const db = await connectDB;
		app.locals.db = db;

		app.use(bodyParser.json());
		app.use('/users', userRoutes)
		app.use('/tweets', tweetRoutes)

		app.listen(port, () => {
			console.log(`app running on port ${port}`);
		})
	}
	catch (error) {
		console.log("erro ao conectar com o banco. fechando...");
		process.exit(1);
	}
}

main();
