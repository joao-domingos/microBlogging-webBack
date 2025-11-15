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
		app.use(session({
  			// Esta 'secret' é usada para "assinar" o cookie da sessão.
  			// Mude para uma string aleatória e segura.
  			secret: 'zenitpolar', 
  
  			resave: false, // Não salva a sessão se não houver modificação
  			saveUninitialized: false, // Não cria sessão para quem não está logado
		}));

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
