const express = require('express');
const Router = express.Router();

// const Route = require('./api/Controller/Route');

// Router.use('/application/', Route);

Router.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

module.exports = Router;