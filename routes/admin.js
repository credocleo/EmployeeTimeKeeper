var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile('admin'); //sends employee jade file
});

module.exports = app;