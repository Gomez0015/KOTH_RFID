const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController.js');

router.post('/incScore', (req, res) => {
    apiController.incScore(req, res);
});

module.exports = router;