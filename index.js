const mongoose = require('mongoose');
const app = require('./app');

// file configuration to run server with express
const config = require('./config');

// First connect to the data base and server runing as callback
// to ensure that both are working at the same time
mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error connecting to the data base: ${err}`)
  }
  console.log('Connected to the data base...')

  // making the app listening to port
  app.listen(config.port, () => {
    console.log(`RESTapi running on http://localhost:${config.port}`);
  });
})

