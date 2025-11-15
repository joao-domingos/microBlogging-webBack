const express = require('express');
const Likes = require('../models/Likes');

const router = express.Routers();

router.get('/', async (req, res) => {
	try {
		const tweets = await Likes.queryAllLiked();
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

