const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes')

const app = express();

// bodyparser to get json on good format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// calling api to use end points
app.use('/api', api);

module.exports = app;
