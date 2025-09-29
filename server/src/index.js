require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 5000;


connectDB()
.then(() => {
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
})
.catch((err) => {
console.error('Failed to connect to DB', err);
process.exit(1);
});
