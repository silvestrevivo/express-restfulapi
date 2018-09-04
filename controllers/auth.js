'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function singUp() {
  const user = new User({
    email: req.body.mail,
    displayName: req.body.displayName,
  })

  // Previous is ejecuted the pre() function in User module to encrypt it
  user.save(err => {
    if (err) res.status(500).send({ message: `Error creating user: ${err}` })

    return res.status(200).send({ token: service.createToken(user) })
    // since the token is created, this goes in the header of the http requests
  })
}

function singIn() {
  //...
}

module.exports = {
  singUp,
  singIn,
}
