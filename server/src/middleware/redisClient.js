const { createClient } = require('redis');


const url = process.env.REDIS_URL || 'redis://redis:6379';
const client = createClient({ url });


client.on('error', (err) => console.error('Redis Client Error', err));


(async () => {
try {
await client.connect();
console.log('Redis connected');
} catch (err) {
console.error('Could not connect to Redis', err);
}
})();


module.exports = client;
