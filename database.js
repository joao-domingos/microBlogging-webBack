const MongoClient = require('mongodb').MongoClient;

let db;
let client;

async function connectDB() {
	client = new MongoClient('mongodb://localhost:27017');
	await client.connect();
	db = client.db('microblogging');
	console.log('conectado ao db');
}

async function desconnectDB() {
	if (client) {
		await client.close();
		console.log("desconectado do db");
	}
}

function getDB() {
	if (!db) throw new Error('banco de dados nao inicializado');
	return db;
}

//código presente no meu arquivo excluído de criação de server
/*const http = require('http');
const { database } = require('./database');

const PORT = 8080;

const server = http.createServer((req, res) => {
	res.end("entrega1-webBack")
});

server.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});*/

module.exports = { connectDB, desconnectDB, getDB };
