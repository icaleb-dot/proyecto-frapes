const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on('error', (err) => console.log('Error en Cliente Redis', err));
redisClient.on('connect', () => console.log('Redis Conectado (Local Docker)...'));


const connectRedis = async () => {
  await redisClient.connect();
};

module.exports = { connectRedis, redisClient };