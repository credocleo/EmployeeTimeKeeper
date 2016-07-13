var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile('employee'); //sends employee jade file
});

module.exports = app