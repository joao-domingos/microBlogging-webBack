function handleError(res, err) {
	res.writeHead(500, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ error: 'erro interno do servidor', details: err.message }));
}

module.exports = { handleError }
