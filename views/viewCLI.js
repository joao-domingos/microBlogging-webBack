const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

function menu() {
	setTimeout(() => {
		console.clear();

		console.log("1 - tweetar");
		console.log("2 - mostrar tweets");
		console.log("3 - busca tweet");
		console.log("4 - edita tweet");
		console.log("5 - deleta tweet");
		console.log("6 - encerrar programa");
		
		rl.question("escolha sua opcao: ", (answer) => {
			switch(answer) {
				case "1": 
					rl.question("whats happening? "), (tweet) => {
						await newTweet(tweet);
					}
					break;
				case "2":
					console.log(await queryAllTweets()); 
					break;
				case "3":
					rl.question("buscar: "), (word) => {
						await queryTweet(word);
					}
					break;
				case "4":
					//editar tweet, nao criei a funcao ainda
					break;
				case "5":
					//mostra tweets buscados e depois pede pra escolher um pra excluir
					await queryAllTweets();
					rl.question("qual tweet deseja deletar? "), (tweetToDelete) => {
						await deleteTweet(tweetToDelete);	
					}
				case "6":
					console.log('encerrando...');
					rl.close();
					process.exit(0);
				default: {
					console.log('opcao invalida, escolha novamente!');
					menu();
				}
			}
		})
	}, 1000)
}

menu();
