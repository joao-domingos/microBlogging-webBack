//funcao para fazer o log, cria a mensagem com date e separacao por linha depois da append no meu arquivo de log logs.txt

const fs = require('fs');

function logger(error) {
  const message = `[${new Date().toISOString()}] ${error.message}\n`;
  fs.appendFileSync('logs.txt', message);
}

//faz validacao dos dados do tweet
function validateTweet(data) {
	let errors = [];
	if (!data.title) errors.push("titulo é obrigatorio");
	if (!data.content) erros.push("conteudo é obrigatorio");
	if (!data.author) errors.push("autor é obrigatorio");
	return errors;
}

//handle error
function handleError(res, err) {
	res.writeHead(500, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ error: 'erro interno do servidor', details: err.message }));
}

module.exports = logger;
