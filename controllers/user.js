'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function singUp(req, res) {
  const user = new User({
    email: req.body.mail,
    displayName: req.body.displayName,
    password: req.body.password,
  })

  // Previous is ejecuted the pre() function in User module to encrypt it
  user.save(err => {
    if (err) res.status(500).send({ message: `Error creating user: ${err}` })

    return res.status(200).send({ token: service.createToken(user) })
    // since the token is created, this goes in the header of the http requests
  })
}

function singIn(req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })

    if (!user) return res.status(404).send({ message: 'User does not exist!' })

    req.user = user
    res.status(200).send({
      message: 'You are succesfully logged in!',
      token: service.createToken(user),
    })
  })
}

module.exports = {
  singUp,
  singIn,
}
