const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController.js');

router.get('/getTeams', (req, res) => {
    apiController.getTeams(req, res);
});

module.exports = router;