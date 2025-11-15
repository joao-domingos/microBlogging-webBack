const express = require('express');
const Tweets = require('../models/Tweets');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const tweets = await Tweets.buscarTodosTweets();
		res.json({ 
			message: "what's happening?",
			tweets: tweets,
		});
	}
	catch (error) {
		res.json({ error: error.message });
	}
})

router.post('/newTweet/:tweet', async (req, res) => {
	try {
		const tweetData = req.params.tweet;
		await Tweets.novoTweet(tweetData);
		res.json({ tweet: tweetData });
	}
	catch (error) {
		res.json({ error: error.message });
	}
})

router.get('/byWord/:word', async (req, res) => {
	try {
		const word = req.params.word;
		const ttByWord = await Tweets.buscarTweetPalabra(word);
		res.json({ tweets: ttByWord });
	}	
	catch (error) {
		res.json({ error: error.message })
	}
})

router.delete('/deletar/:id', async (req, res) => {
	try {
		const toDelete = req.params.id;
		await User.deleteTweet(toDelete);
		res.json({ 
			message: "deleted successfully",
			tweet: toDelete,
		});
	}
	catch (error) {
		res.json({ error: error.message })
	}
})

router.put('/atualizar/:id/:newData', async (req, res) => {
	try {
		const id = req.params.id;
		const newData = req.params.newData;
		await atualizarTweet(id, newData);
		res.json({ 
			id: _id,
			newData: newData,
		});
	}
	catch (error) {
		res.json({ error: error.message })
	}
})


module.exports = router;
