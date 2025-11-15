const { connectDB } = require('./database');
const logger = require('./logger');

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
		const db = connectDB();
		await db.collection('tweets').insertOne(tweetInfo);
		console.log('tweet inserido!');
	}
	catch (error) {
		console.log('erro ao inserir tweet', error);
		logger(error);
	}
}


async function buscarTweetPalavra(word) {
    	if (!word) {
        	throw new Error("não foi possível buscar, palavra inválida ou não existente");
    	}
	try {
		const db = await connectDB();
		const found = await db.collection('tweets').find({ word }).limit(10).toArray();
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
		const db = await connectDB();
		const found = await db.collection('tweets').find({}).toArray();
		console.log('busca por todos os tweets completa');
		return found;
	}
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
		const db = connectDB();
		await db.collection('tweets').deleteOne({ _id: tweetToDelete._id });
		console.log(`tweet de id: ${tweetToDelete._id} deletado com sucesso`);
	}
	catch (error) {
		console.log('error deleting tweet', error);
		logger(error);
	}
}

async function atualizarTweet(tweetId, tweetContent) {
    	if (!tweetId || !tweetContent) {
        	throw new Error("tweetId ou tweetContent não existente ou inválido");
    	}
    	try {
		const db = connectDB();	
        	await db.collection('tweets').updateOne(
			{ _id: tweetId },
			{ $set: { tweetContent, updateAt: new Date() }},
		);
    	}	
    	catch (error) {
		res.json({ error: error.message })
    	}
}

module.exports = { novoTweet,
	buscarTweetPalavra,
	buscarTodosTweets,
	deleteTweet,
	atualizarTweet
};
