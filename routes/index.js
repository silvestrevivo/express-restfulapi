const express = require('express');
const api = express.Router();

// Controllers
const productCtrl = require('../controllers/product');

// get all products
api.get('/product', productCtrl.getProducts);

// get a product by id
api.get('/product/:productId', productCtrl.getProduct)

// post a product in the database
api.post('/product', productCtrl.postProduct);

// edit a element by Id
api.put('/product/:productId', productCtrl.updateProduct);

// delete a product by Id
api.delete('/product/:productId', productCtrl.deleteProduct);

module.exports = api
