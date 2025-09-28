const express = require('express');
const cors = require('cors');
const itemsRoute = require('./routes/items');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/items', itemsRoute);
app.get('/health', (req, res) => res.json({ status: 'ok' }));


module.exports = app;
