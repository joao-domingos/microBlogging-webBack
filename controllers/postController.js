const Tweets = require('../models/Tweets');
const { validatePost } = require('../utils/validators');
const { handleError } = require('../utils/errorHandler');

async function handlePosts(req, res, method) {
	try {
		if (method === 'GET') {
			const tweets = await Tweets.queryAllTweets();
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(tweets));
		}

		if (method === 'POST') {
			let body = '';
			req.on('data', chunk => { body += chunk.toString(); });
			req.on('end', async () => {
				const data = JSON.parse(body);

				const errors = validatePost(data);
				if (errors.length > 0) {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					return res.end(JSON.stringify({ errors }));
				}

				await Tweets.newTweet(data);
				res.writeHead(201, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'Tweet criado com sucesso!' }));
			});
		}
	}
	catch (err) {
		handleError(res, err);
	}
}

module.exports = { handlePosts };

