'use strict'

const services = require('../services/index')

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: `You don't have authorization` })
  }

  const token = req.headers.authorization.split(' ')[1]

  services
    .decoded(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
  // we confirm that the user is correct
}

module.exports = isAuth
/*
the meaning of this middleware is to protect some URL's if the user is
not yet authenticated. Each time that the TOKEN is created, this goes
in the headers of the request, in the authorization. That is what we
are here checking.
*/
