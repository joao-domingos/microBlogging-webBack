const http = require('http');
let server = http.createServer((req, res) => {
	res.setHeader('Content-type', 'text/html; charset-UTF-8');

	const fs = require('fs').promises;

	async function readHtmlPage() {
		try {
			const data = await fs.readFile('microBlogging-webBack/frontend/index.html', 'utf-8');
			console.log('file content: ', data);
		} catch (err) {
			console.error('error reading file: ', err);
		}
	}

	readHtmlPage();

	res.end();
});
server.listen(8080);
