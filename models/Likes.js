const { connectDB } = require('../config/connectDB');

async function curtirTweet(tweetId, userId) {
    const db = await connectDB();
    const like = await db.collection('likes').findOne({ tweetId, userId });

    if (like) return { message: "Tweet já curtido por este usuário." };

    await db.collection('likes').insertOne({ tweetId, userId, createdAt: new Date()});

    return { message: "Tweet curtido com sucesso!" };
}

async function removerCurtida(tweetId, userId) {
    const db = await connectDB();
    const result = await db.collection('likes').deleteOne({ tweetId, userId });

    if (result.deletedCount === 0)
        return { message: "Curtida não encontrada." };
    return { message: "Curtida removida." };
}

async function contarCurtidas(tweetId) {
    const db = await connectDB();
    const count = await db.collection('likes').countDocuments({ tweetId });
    return count;
}

async function listarCurtidasPorUsuario(userId) {
    const db = await connectDB();
    const likes = await db.collection('likes').find({ userId }).toArray();
    return likes;
}

async function listarCurtidasPorTweet(tweetId) {
    const db = await connectDB();
    const likes = await db.collection('likes').find({ tweetId }).toArray();
    return likes;
}

module.exports = { curtirTweet, removerCurtida, contarCurtidas, listarCurtidasPorUsuario, listarCurtidasPorTweet };

