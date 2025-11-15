const { connectDB } = require('./models/database');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userAuth = require('./routes/login');
const tweetRoutes = require('./routes/tweets');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/auth', userAuth)
app.use('/tweets', tweetRoutes)
app.use(session({
  	secret: 'zenitpolar', 
  	resave: false, 
  	saveUninitialized: false,

	cookie: { 
    		secure: false, // Em produção, mude para true (requer HTTPS)
    		httpOnly: true, // Impede acesso ao cookie via JavaScript no frontend
    		maxAge: 1000 * 60 * 60 // Tempo de vida do cookie (ex: 1 hora)
  	}
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
