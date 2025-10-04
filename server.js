const http = require('http');
const router = require('./routes/router');

const PORT = 8080;

const server = http.createServer((req, res) => {
	router(req, res);
});

server.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});
