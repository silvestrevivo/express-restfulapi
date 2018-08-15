'use strict'

const mongoose = require('mongoose');
const User = require('../models/user')
const service = require('../services');

function singUp() {
  const user = new User({
    email: req.body.mail,
    displayName: req.body.displayName
  })

  user.save((err) => {
    if(err) res.status(500).send({message: `Error creating user: ${err}`})

    return res.status(200).send({token: service.createToken(user)})
  })
}

function singIn() {

}

module.exports = {
  singUp,
  singIn
}
