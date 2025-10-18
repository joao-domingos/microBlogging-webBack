const http = require('http');
const { connectDB } = require('../config/connectDB');

const PORT = 8080;

const server = http.createServer((req, res) => {
	res.end("entrega1-webBack")
});

server.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});
