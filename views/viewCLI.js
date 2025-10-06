const { connectDB } = require('./config/connectDB');
const { newTweet, queryAllTweets, queryTweet, deleteTweet } = require('../models/Tweets');
const { cadastrarUsuario, buscarNomeUsuario, buscarEmailUsuario, deletarUsuario } = require('../controller/usersController');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function menuTweets() {
    let running = true;

    while (running) {
        console.clear();
        console.log("=== MENU TWEETS ===");
        console.log("1 - Tweetar");
        console.log("2 - Mostrar tweets");
        console.log("3 - Buscar tweet");
        console.log("4 - Editar tweet (não implementado)");
        console.log("5 - Deletar tweet");
        console.log("6 - Voltar ao menu principal");

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
                running = false;
                break;
            default:
                console.log("Opção inválida!");
        }
    }
}

async function menuUsuarios() {
    let running = true;

    while (running) {
        console.clear();
        console.log("=== MENU USUÁRIOS ===");
        console.log("1 - Cadastrar usuário");
        console.log("2 - Buscar usuário por nome");
        console.log("3 - Buscar usuário por email");
        console.log("4 - Deletar usuário");
        console.log("5 - Voltar ao menu principal");

        const choice = await ask("Escolha sua opção: ");

        switch(choice) {
            case "1": {
                const nome = await ask("Nome: ");
                const email = await ask("Email: ");
                const senha = await ask("Senha: ");
                await cadastrarUsuario({ nome, email, senha });
                console.log("Usuário cadastrado com sucesso!");
                break;
            }
            case "2": {
                const nome = await ask("Digite o nome para busca: ");
                const usuario = await buscarNomeUsuario(nome);
                console.log("=== Resultado ===");
                console.log(usuario);
                break;
            }
            case "3": {
                const email = await ask("Digite o email para busca: ");
                const usuario = await buscarEmailUsuario(email);
                console.log("=== Resultado ===");
                console.log(usuario);
                break;
            }
            case "4": {
                const email = await ask("Digite o email do usuário a ser deletado: ");
                await deletarUsuario(email);
                console.log("Usuário deletado com sucesso!");
                break;
            }
            case "5":
                running = false;
                break;
            default:
                console.log("Opção inválida!");
        }
    }
}

async function mainMenu() {
    await connectDB();

    let running = true;

    while (running) {
        console.clear();
        console.log("=== MENU PRINCIPAL ===");
        console.log("1 - Usuários");
        console.log("2 - Tweets");
        console.log("3 - Encerrar programa");

        const choice = await ask("Escolha sua opção: ");

        switch(choice) {
            case "1":
                await menuUsuarios();
                break;
            case "2":
                await menuTweets();
                break;
            case "3":
                console.log("Encerrando...");
                running = false;
                break;
            default:
                console.log("Opção inválida!");
        }
    }

    rl.close();
}

module.exports = { mainMenu };
 
