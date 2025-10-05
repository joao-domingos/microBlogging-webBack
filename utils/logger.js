//funcao para fazer o log, cria a mensagem com date e separacao por linha depois da append no meu arquivo de log logs.txt

const fs = require('fs');

function logger(error) {
  const message = `[${new Date().toISOString()}] ${error.message}\n`;
  fs.appendFileSync('logs.txt', message);
}

module.exports = logger;
