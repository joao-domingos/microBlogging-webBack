const { connectDB } = require('./config/connectDB');
const { newTweet, queryAllTweets, queryTweet, deleteTweet } = require('../models/Tweets');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function mainMenu() {
    let running = true;

    while (running) {
        console.clear();
        console.log("=== MENU ===");
        console.log("1 - Tweetar");
        console.log("2 - Mostrar tweets");
        console.log("3 - Buscar tweet");
        console.log("4 - Editar tweet (não implementado)");
        console.log("5 - Deletar tweet");
        console.log("6 - Encerrar programa");

        const choice = await ask("Escolha sua opção: ");

        switch(choice) {
            case "1": {
                const tweet = await ask("O que você quer tweetar? ");
                await newTweet(tweet);
                console.log("Tweet publicado!");
                break;
            }
            case "2": {
                const tweets = await queryAllTweets();
                console.log("=== Tweets ===");
                console.log(tweets);
                break;
            }
            case "3": {
                const word = await ask("Buscar: ");
                const result = await queryTweet(word);
                console.log("=== Resultados da busca ===");
                console.log(result);
                break;
            }
            case "4":
                console.log("Função de editar tweet ainda não implementada.");
                break;
            case "5": {
                const tweets = await queryAllTweets();
                console.log("=== Tweets disponíveis ===");
                console.log(tweets);
                const tweetToDelete = await ask("Qual tweet deseja deletar? ");
                await deleteTweet(tweetToDelete);
                console.log("Tweet deletado!");
                break;
            }
            case "6":
                console.log("Encerrando...");
                running = false;
                break;
            default:
                console.log("Opção inválida!");
        }

        if (running) await ask("Pressione Enter para continuar...");
    }

    rl.close();
}

module.exports = { mainMenu };
