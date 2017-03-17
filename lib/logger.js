/**
 * Debug Logger.
 *
 * @author Jared Allard <jaredallard@outlook.com>
 * @version 1.0.0
 **/

const debug = require('debug');


/**
 * Standard Console output w/ timestamps.
 *
 * @param {String} Module - name to classify this debug output under.
 * @returns {Function} debug function.
 **/
let CONSOLE = Module => {
  return (...args) => {
    args.unshift(Module);
    args.unshift(new Date().toUTCString());

    return console.log.apply(console, args);
  }
}

/**
 * JSON adapter with module, out, properties.
 *
 * @param {String} Module - name to classify this debug output under.
 * @returns {Function} debug function.
 **/
let jsonAdapter = Module => {
  return (...args) => {
    return console.log({
      module: Module,
      out: args.toString(' ')
    })
  }
}

const ADAPTERS = {
  console: CONSOLE,
  json:    jsonAdapter,
  debug:   debug
}

module.exports = Module => {
  let adapter     = process.env.DEBUG_ADAPTER || 'debug';

  // Make sure input is OK.
  adapter = adapter.toLowerCase();

  const ADAPTER = ADAPTERS[adapter];

  if(!ADAPTER) throw Error(`Invalid Adapter: ${adapter}`)

  let debugInstance = ADAPTER(Module);

  // wrapper around debug so we can intercept the args.
  let func = (...args) => {
    return debugInstance.apply(debugInstance, args);
  }

  return func
}
