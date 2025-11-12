const express = require('express');
const Tweets = require('../models/Tweets');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const tweets = await Tweets.buscarTodosTweets();
		res.json(tweets);
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

router.post('/atualizar/:id/:newData', async (req, res) => {
	try {
		const id = req.params.id;
		const newData = req.params.newData;
		await atualizarTweet(id, newData);
		res.json({ 
			id: id;
			newData: newData
		})
	}
	catch (error) {
		res.json({ error: error.message })
	}
})


module.exports = router;
