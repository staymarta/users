/**
 * Users Service
 *
 * @author Jared Allard <jared@staymarta.com>
 * @license BSD-3-Clause
 * @version 1
 **/

'use strict';

const express       = require('express')
const Joi           = require('joi')
const Database      = require('./lib/db.js')
const debug         = require('./lib/logger.js')('staymarta:users')

const bodyP         = require('body-parser')
const validate      = require('express-validation')
const app           = express();

// disable unknowns.
const schemaOptions = {
  allowUnknownBody:    false,
  allowUnknownHeaders: false,
  allowUnknownQuery:   false,
  allowUnknownParams:  false,
  allowUnknownCookies: false
}

let db              = new Database()
db.connect('users')

app.use(bodyP.json())
app.use(require('./lib/service.js'))

// Get authenticated user
app.get('/me', (req, res) => {
  return res.error('NOT_IMPLEMENTED');
})

// Create a user
app.post('/',
  validate({
    options: schemaOptions,
    body: {
      username: Joi.string().alphanum().required(),
      full_name: Joi.string().required(),
      age: Joi.number().required(),
      location: Joi.string().required(),
      email: Joi.string().email().required()
    }
  }),
async (req, res) => {
  try {
    await db.exists('users', 'username', req.body.username)
    await db.create('users', req.body, false)
  } catch(e) {
    if(e.message === 'EXISTS') return res.error('User already exists')
    return res.error('Failed to create user')
  }

  return res.success()
})

app.listen(80);

process.on('unhandledRejection', reason => {
  console.log('Unhandled Promise Rejection', reason)
});
