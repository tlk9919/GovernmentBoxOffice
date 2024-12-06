const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');

router.get('/houses', houseController.getHouses);
router.get('/houses/:id', houseController.getHouseDetail);

module.exports = router;
