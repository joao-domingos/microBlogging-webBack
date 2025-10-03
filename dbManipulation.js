import { connectDB } from './connectDB.js'

const db = await connectDB();
const tweets = db.collection('tweets');
const likes = db.collection('likedTweets');

async function getTimeDate() {
	const currentDate = new Date();
	const currentTime = await currentDate.getTime();
	return { tweetDate: currentDate, tweetTime: currentTime };}

async function newTweet(tweet) {
	const timeDate =  await getTimeDate();
	const tweetInfo = { userTweet: tweet, ...timeDate }; 
	await tweets.insertOne(tweetInfo);
	console.log("tweet inserido");
}

async function queryTweet(word) {
	const found = await tweets.find(word).toArray();
	return found;
}

async function queryAllTweets() 
	const allTweets = await tweets.toArray();
	return allTweets;
{}

async function deleteTweet(tweetToDelete) {
	if (tweetToDelete) {
		await tweets.deleteOne({ _id: tweetToDelete._id });
		console.log("tweet deleted:", tweetToDelete);
	}
}

export const dbManipulation = { newTweet, queryTweet, deleteTweet };
