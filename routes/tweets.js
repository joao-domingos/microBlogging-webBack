const express = require('express');
const Tweets = require('../models/Tweets');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const tweetsQuery = await Tweets.buscarTodosTweets();
		res.json(tweetsQuery);
	}
	catch (error) {
		res.json({ error: error.message });
	}
})

router.post('/newTweet', async (req, res) => {
	const tweetData = req.body;
	await novoTweet(tweetData);
	res.json(tweetData);
})

router.get('/byWord', async (req, res) => {
	const wordToFind = req.body;
	const tweetsByWord = await buscarTweetPalavra(wordToFind);
	res.json(tweetsByWord);
})

router.post('/deletar', async (req, res) => {
	const tweetToDelete = req.body;
	await deleteTweet(tweetToDelete);
	res.json(tweetToDelete);
})

//terminar funcao de update
router.post('/atualizar', async (req, res) => {
	const tweetNewData = req.body;
	await atualizarTweet(tweetNewData);
	res.json(tweetNewData);
})


module.exports = router;
