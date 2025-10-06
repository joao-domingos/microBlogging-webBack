const { curtirTweet, removerCurtida, contarCurtidas, listarCurtidasPorUsuario, listarCurtidasPorTweet } = require('../models/Likes');

async function likeTweet(tweetId, userId) {
    return await curtirTweet(tweetId, userId);
}

async function unlikeTweet(tweetId, userId) {
    return await removerCurtida(tweetId, userId);
}

async function getLikesCount(tweetId) {
    const count = await contarCurtidas(tweetId);
    return { tweetId, likes: count };
}

async function getUserLikes(userId) {
    const likes = await listarCurtidasPorUsuario(userId);
    return likes;
}

async function getTweetLikes(tweetId) {
    const likes = await listarCurtidasPorTweet(tweetId);
    return likes;
}

module.exports = { likeTweet, unlikeTweet, getLikesCount, getUserLikes, getTweetLikes };

