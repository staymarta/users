/**
 * Users Service
 *
 * @author Jared Allard <jared@staymarta.com>
 * @license BSD-3-Clause
 * @version 1
 **/

'use strict';

const Communication = require('libcommunication')
const debug         = require('debug')('staymarta:users')

const communication = new Communication();

(async () => {

  await communication.connect('users');

  debug('service', 'waiting for messages');
  communication.wait('v1.users.get', msg => {
    const req = msg.body.request;
    let user = req.string;

    if(!user) {
      msg.error('USER_NOT_FOUND', 404);
      return;
    }

    msg.reply({
      username: 'jaredallard',
      name: 'Jared Allard'
    })
  });
})()
