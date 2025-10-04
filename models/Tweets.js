const { getDB } = require('../config/connectDB');

function getCollection() {
	return getDB().collection('tweets');
}

async function getTimeDate() {
	const currentDate = new Date();
	const currentTime = currentDate.getTime();
	return { tweetDate: currentDate, tweetTime: currentTime };}

async function newTweet(tweet) {
	const dbTweets = getCollection();
	const timeDate =  await getTimeDate();
	const tweetInfo = { userTweet: tweet, ...timeDate }; 
	await dbTweets.insertOne(tweetInfo);
	console.log("tweet inserido");
}

async function queryTweet(word) {
	const dbTweets = getCollection();
	const found = await dbTweets.find({ word }).toArray();
	return found;
}

async function queryAllTweets() {
	const dbTweets = getCollection();
	const found = await dbTweets.find({}).toArray();
	return found;
}

async function deleteTweet(tweetToDelete) {
	if (tweetToDelete) {
		const dbTweets = getCollection();
		await dbTweets.deleteOne({ _id: tweetToDelete._id });
		console.log('tweet deletado: ', tweetToDelete);
	}
}

module.exports = { newTweet, queryTweet, queryAllTweets, deleteTweet };
