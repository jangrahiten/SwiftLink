const express = require('express');
const { generateNewShortURL } = require('../controllers/url.controller');
const router = express.Router();

router.post('/',generateNewShortURL);

module.exports = router