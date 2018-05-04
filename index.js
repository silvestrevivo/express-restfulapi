const express = require('express'),
  bodyParser = require('body-parser');

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

// making the app listening to port
app.listen(port, () => {
  console.log(`RESTapi running on http://localhost:${port}`);
});
