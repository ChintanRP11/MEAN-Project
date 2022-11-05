const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const router = express.Router();

router.use(express.static(path.join(rootDir,'public')));

router.get('/',(req, res, next) => {
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;