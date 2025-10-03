import http from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './connectDB.js';
import { dbManipulation } from './dbManipulation.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../frontend/index.html');

const hostname = "localhost";
const port = 8080;

const server = http.createServer(async (req, res) => {
	console.log("URL:", req.url, "METHOD:", req.method);
	if (req.url ===  '/' && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		const html = await readFile(filePath, 'utf-8');
		console.log("html loaded successufully");
		res.write(html);
		res.end();
	}
	else if((req.url === '/tweets') && req.method === 'GET' ) {
		const tweetsData = await dbManipulation.queryTweet({});
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(tweetsData));
	}
	else if((req.url === '/tweets') && req.method === 'POST') {
		let body = "";
		req.on("data", chunk => {
			body += chunk.toString();
		});
		req.on("end", async () => {
			const { tweet } = JSON.parse(body);
			await dbManipulation.newTweet(tweet);
			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: "tweet criado" }))
		});
	}
	else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'route not found' }));
	}
});

server.listen(port, hostname, ()=> {
	console.log(`node server running in http://${hostname}:${port}`);
});

