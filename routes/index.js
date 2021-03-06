'user strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

// get all products
api.get('/product', productCtrl.getProducts)

// get a product by id
api.get('/product/:productId', productCtrl.getProduct)

// post a product in the database
api.post('/product', auth, productCtrl.postProduct)

// edit a element by Id
api.put('/product/:productId', auth, productCtrl.updateProduct)

// delete a product by Id
api.delete('/product/:productId', auth, productCtrl.deleteProduct)

//Authentication
api.post('/signup', userCtrl.singUp)

api.post('/signin', userCtrl.singIn)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'You have access' })
})

module.exports = api
