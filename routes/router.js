const { handlePosts } = require('../controllers/postController');
//const { handleUsers } = require('../controllers/userController');

function router(req, res) {
	const url = req.url;
	const method = req.method;

	if (url.startsWith('/posts')) {
		handlePosts(req, res, method);
	}
	else if(url.startsWith('/users')) {
		handleUsers(req, res, method);
	}
	else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ error: 'rota nao encontrada' }));
	}
}

module.exports = router;
