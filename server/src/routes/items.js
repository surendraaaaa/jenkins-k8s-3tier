const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache');
const controller = require('../controllers/itemsController');


router.get('/', cache, controller.getItems);
router.post('/', controller.createItem);
router.get('/:id', controller.getItem);


module.exports = router;
