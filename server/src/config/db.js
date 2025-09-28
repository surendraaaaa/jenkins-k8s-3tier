const mongoose = require('mongoose');


module.exports = async function connectDB() {
const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/three_tier_app';
await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB connected');
};
