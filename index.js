const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// basic configuration to run server with express
const app = express();
const port = process.env.PORT || 3000;

// bodyparser to get json on good format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Creating ending points
app.get('/hello/:message', (req, res) => {
  res.send({ message: `Hello ${req.params.message}!!s` });
  //http://localhost:3000/hello/world => {"message":"Hello world!!"}
});

// First connect to the data base and server runing as callback
// to ensure that both are working at the same time
// localhost:27017 => by default the url to access to the data bases
// /param => name of the database we have created via the terminal
mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error connecting to the data base: ${err}`)
  }
  console.log('Connected to the data base...')

  // making the app listening to port
  app.listen(port, () => {
    console.log(`RESTapi running on http://localhost:${port}`);
  });
})

