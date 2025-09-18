import http from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../frontend/index.html');

const server = http.createServer(async (req, res) => {
	res.setHeader('Content-type', 'text/html; charset-UTF-8');

	try {
		const html = await readFile(filePath, 'utf-8');
		console.log("html lido com sucesso");
		res.end(html);
	} catch (error) {
		console.error("html deu ruim", error);
	}

});

server.listen(8080);
