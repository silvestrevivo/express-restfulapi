'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

// This is the user model
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
})

// this is ejecuted before the password is sent to be encrypted
UserSchema.pre('save', function(next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next()

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next()

      user.password = hash
      next()
    })
  })
})

// this takes the url from gravatar through the email, and it will be saved
// before mongoose is going to save the user in the DB
UserSchema.methods.gravatar = function() {
  if (!this.mail) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto
    .createHash('md5')
    .update(this.mail)
    .digest('hex')

  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
