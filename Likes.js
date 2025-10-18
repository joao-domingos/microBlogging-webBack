const { connectDB } = require('../config/connectDB');
const logger = require('../utils/logger');

const db = await connectDB();
const likesDB = db.collection('likes');

async function curtirTweet(tweetId, userId) {
    if (!tweetId) {
        throw new Error("tweetId não existente ou inválido");
    }
    if (!userId) {
        throw new Error("userId não existente ou inválido");
    }
    
    const isLiked = await likesDB.findOne({ tweetId, userId });
    if (isLiked) {
        console.log('tweet já foi curtido pelo usuário');
        return;
    }
    try {
        await db.collection('likes').insertOne({ tweetId, userId, createdAt: new Date()});
        console.log('tweet curtido inserido com sucesso!');
    catch (error) {
        console.log('erro ao inserir o tweet curtido no db');
        logger(error);
    }
}

async function removerCurtida(tweetId, userId) {
    if (!tweetId) {
        throw new Error("tweetId não existente ou inválido");
    }
    if (!userId) {
        throw new Error("userId não existente ou inválido");
    }
    
    const isLiked = await likesDB.findOne({ tweetId, userId });
    if (!isLiked) {
        console.log('tweet não curtido pelo usuário');
        return;
    }
    
    try {
        likesDB.deleteOne({ tweetId: tweetId, userId: userId });
        console.log("curtida deletada com sucesso");
    }
    catch (error) {
        console.log("erro ao deletar curtida");
        logger(error);
    }
}

async function buscarCurtidasUsuario(userId) {
    if (!userId) {
        throw new Error("userId não existente ou inválido");
    }
    try {
        const userLikes = await likesDB.find({ userId }).toArray();
        console.log("busca por curtidas do usuario completa");
        return likes;
    }
    catch (error) {
        console.log("erro ao buscar curtidas do usuario");
        logger(error);
    }
}

async function buscarCurtidasTweet(tweetId) {
    if (!tweetId) {
        throw new Error("tweetId não existente ou inválido");
    }
    try {
        const tweetLikes = await likesDB.find({ tweetId }).toArray();
        console.log("busca por curtidas do tweet completa");
        return likes;
    }
    catch (error) {
        console.log("erro ao buscar curtidas do tweet");
        logger(error);
    }
}

module.exports = { curtirTweet, removerCurtida, buscarCurtidasUsuario, buscarCurtidasTweet };

