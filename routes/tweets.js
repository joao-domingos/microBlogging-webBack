const express = require('express');
const router = express.Router();

const db = require('../models/database');
const tweets = require('../models/Tweets');

//pega o db e collection users e retorna para usersDB
tweetsDB = db.connectDB;
tweetsDB = usersDB.tweets;

router.get('/', (req, res) => {
	tweets = await buscarTodosTweets();
	res.json(tweets);
})

router.post('/newTweet', (req, res) => {
	const tweetData = req.body;
	await novoTweet(tweetData);
	res.json(tweetData);
})

router.get('/byWord', (req, res) => {
	const wordToFind = req.body;
	const tweetsByWord = await buscarTweetPalavra(wordToFind);
	res.json(tweetsByWord);
})

router.post('/deletar', (req, res) => {
	const tweetToDelete = req.body;
	await deleteTweet(tweetToDelete);
	res.json(tweetToDelete);
})

//terminar funcao de update
router.post('/atualizar', (req, res) => {
	const tweetNewData = req.body;
	await atualizarTweet(tweetNewData);
	res.json(tweetNewData);
})


module.exports = router;
