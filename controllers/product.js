'use strict'

const Product = require('../models/product');

// get all products controller
function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!products) return res.status(404).send({ message: 'There is no any products' })

    res.status(200).send({ products })
  });
}

// get a product by id controller
function getProduct(req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (!product) return res.status(404).send({ message: 'The product does not exist' })

    res.status(200).send({ product })
  });
}

// post a product in the database controller
function postProduct(req, res) {
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
}

// edit a element by Id controller
function updateProduct(req, res) {
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({ message: `Error trying to update product: ${err}` });

    res.status(200).send({ product: productUpdated })
  });
}

// delete a product by Id controller
function deleteProduct(req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Error trying to delete product: ${err}` });

    product.remove(err => {
      if (err) res.status(500).send({ message: `Error trying to delete product: ${err}` });

      res.status(200).send({ message: `The product was succesfully deleted` });
    });
  });
}


module.exports = {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct
}
