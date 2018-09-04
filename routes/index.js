'user strict'

const express = require('express');
const productCtrl = require('../controllers/product');
const auth = require('../middlewares/auth');
const api = express.Router();


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

//Authentication
api.get('/private', auth.isAuth, (req, res) => {
  res.status(200).send({message: 'You have access'});
})

module.exports = api
