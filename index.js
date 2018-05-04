const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Product = require('./models/product');

// basic configuration to run server with express
const app = express();
const port = process.env.PORT || 3000;

// bodyparser to get json on good format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


////////////////// Creating ending points //////////////////
app.get('/hello/:message', (req, res) => {
  res.send({ message: `Hello ${req.params.message}!!` });
  //http://localhost:3000/hello/world => {"message":"Hello world!!"}
});

app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!products) return res.status(404).send({ message: 'There is no any products' })

    res.status(200).send({ products })
  });
});

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!product) return res.status(404).send({ message: 'The product does not exist' })

    res.status(200).send({ product })
  });
});

app.post('/api/product', (req, res) => {
  console.log('POST /api/product');
  console.log('Request Body', req.body);

  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error saving in the data base: ${err} ` })
    res.status(200).send({ product: productStored })
  });
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

