const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes')

const app = express();

// bodyparser to get json on good format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


////////////////// Creating ending points //////////////////
app.get('/hello/:message', (req, res) => {
  res.send({ message: `Hello ${req.params.message}!!` });
  //http://localhost:3000/hello/world => {"message":"Hello world!!"}
});

app.use('/api', api);
////////////////// End of ending points //////////////////

module.exports = app;
