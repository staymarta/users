/**
 * Users Service
 *
 * @author Jared Allard <jared@staymarta.com>
 * @license BSD-3-Clause
 * @version 1
 **/

'use strict';

const debug         = require('debug')('staymarta:users')
const express       = require('express')
const Joi           = require('joi')

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

app.use(bodyP.json())

app.get('/me', (req, res) => {
  return res.send({
    username: 'jaredallard',
    first_name: 'Jared',
    last_name: 'Allard',
    email: 'jaredallard@outlook.com'
  });
})

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
(req, res) => {
  return res.send(req.body)
})

app.listen(80);
