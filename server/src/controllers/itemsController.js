const Item = require('../models/Item');


exports.getItems = async (req, res) => {
try {
const items = await Item.find().sort({ createdAt: -1 }).lean();
// cache for 10 seconds (adjust as needed)
try {
await redisClient.setEx('items', 10, JSON.stringify(items));
} catch (e) {
console.warn('Could not set cache', e);
}
res.json(items);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


exports.createItem = async (req, res) => {
try {
const { name, description } = req.body;
const item = new Item({ name, description });
await item.save();
// invalidate cache
try {
await redisClient.del('items');
} catch (e) {
console.warn('Could not invalidate cache', e);
}
res.status(201).json(item);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


exports.getItem = async (req, res) => {
try {
const item = await Item.findById(req.params.id).lean();
if (!item) return res.status(404).json({ error: 'Not found' });
res.json(item);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};
