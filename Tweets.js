const { getDB } = require('../config/connectDB');

function getCollection() {
	return getDB().collection('tweets');
}

async function getTimeDate() {
	const currentDate = new Date();
	const currentTime = currentDate.getTime();
	return { tweetDate: currentDate, tweetTime: currentTime };
}

async function newTweet(tweet) {
	const dbTweets = getCollection();
	const timeDate =  await getTimeDate();
	const tweetInfo = { userTweet: tweet, ...timeDate };
	try {
		await dbTweets.insertOne(tweetInfo);
		console.log("tweet inserted");
	}
	catch (error) {
		console.log('error inserting tweets')
	}
}

async function queryTweet(word) {
	const dbTweets = getCollection();
	try {
		const found = await dbTweets.find({ word }).limit(10).toArray();
		console.log('10 tweets by word found');
		return found;
	}
	catch (error) {
		console.log('error querying 10 tweets', error);
	}
}

async function queryAllTweets() {
	const dbTweets = getCollection();
	try {
		const found = await dbTweets.find({}).toArray();
		console.log('all tweets found');
		return found;
	};
	catch (error) {
		console.log('error querying all tweets', error);
	}
}

async function deleteTweet(tweetToDelete) {
	if (tweetToDelete) {
		const dbTweets = getCollection();
		try {
			await dbTweets.deleteOne({ _id: tweetToDelete._id });
			console.log('tweet deleted: ', tweetToDelete);
		}
		catch (error) {
			console.log('error deleting tweet', error);
		}
	}
}

module.exports = { newTweet, queryTweet, queryAllTweets, deleteTweet };
