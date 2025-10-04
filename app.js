const { connectDB } = require('./config/connectDB');
const { mainMenu } = require('./views/viewCLI');

async function app() {
	try {
		await connectDB();

		await mainMenu();
	}
	catch (err) {
		console.error('problema na inicizalizacao do sistema: ', err);
		process.exit(1);
	}
}

app();
