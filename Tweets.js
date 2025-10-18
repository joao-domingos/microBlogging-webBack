const { getDB } = require('../config/connectDB');
const logger = require('../utils/logger');

const db = getDB();
const tweetsDB = db.collection('tweets');

async function getHoraData() {
	const currentDate = new Date();
	const currentTime = currentDate.getTime();
	return { tweetDate: currentDate, tweetTime: currentTime };
}

async function novoTweet(tweet) {
    if (!tweet) {
        throw new Error("não é possível inserir tweet sem conteúdo");
    }
	const timeDate =  await getTimeDate();
	const tweetInfo = { userTweet: tweet, ...timeDate };
	try {
		await tweetsDB.insertOne(tweetInfo);
		console.log('tweet inserido!');
	}
	catch (error) {
		console.log('erro ao inserir tweet', error);
		logger(error);
	}
}

async function buscarTweetPalavra(word) {
    if (!word) {
        throw new Error("não foi possível buscar, palavra inválida ou não existente")
    }
	try {
		const found = await tweetsDB.find({ word }).limit(10).toArray();
		console.log('10 tweets encontrados com essa palavra');
		return found;
	}
	catch (error) {
		console.log('erro ao consultar tweets', error);
		logger(error);
	}
}

async function buscarTodosTweets() {
	try {
		const found = await tweetsDB.find({}).toArray();
		console.log('busca por todos os tweets completa');
		return found;
	};
	catch (error) {
		console.log('erro ao buscar todos os tweets', error);
		logger(error);
	}
}

async function deleteTweet(tweetToDelete) {
    if (!tweetToDelete) {
        throw new Error("tweet a ser deletado não existe ou inválido");
    }
	try {
		await dbTweets.deleteOne({ _id: tweetToDelete._id });
		console.log(`tweet de id: ${tweetToDelete._id} deletado com sucesso`);
	}
	catch (error) {
		console.log('error deleting tweet', error);
		logger(error);
	}
}

module.exports = { novoTweet, buscarTweet, buscarTodosTweets, deletarTweet };
