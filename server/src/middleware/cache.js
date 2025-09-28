const client = require('./redisClient');


module.exports = async function cache(req, res, next) {
try {
const cached = await client.get('items');
if (cached) {
return res.json(JSON.parse(cached));
}
next();
} catch (err) {
// If redis fails, continue and serve from DB
console.error('Cache middleware error', err);
next();
}
};
