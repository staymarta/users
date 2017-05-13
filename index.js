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

const app           = express();

app.get('/me', (req, res) => {
  return res.send({
    username: 'jaredallard',
    first_name: 'Jared',
    last_name: 'Allard',
    email: 'jaredallard@outlook.com'
  });
})

app.listen(80);
