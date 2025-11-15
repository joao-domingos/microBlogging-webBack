const { connectDB } = require('./models/database');
const express = require('express');
const bodyParser = require('body-parser');
const userAuth = require('./routes/login');
const tweetRoutes = require('./routes/tweets');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/auth', userAuth)
app.use('/tweets', tweetRoutes)
app.use(session({
  	secret: 'zenitpolar', 
  	resave: false, 
  	saveUninitialized: false, 
}));

async function main() {
	try {
		const db = await connectDB;
		app.locals.db = db;

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
