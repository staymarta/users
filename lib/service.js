/**
 * Some stuff for services ExpressJS
 */

const os = require('os')

// @todo DRY
module.exports = (req, res, next) => {
  /**
   * Return success.
   * @param  {*} data      Data to return
   * @return {res}         ExpressJS
   */
  res.success = data => {
    res.set({
      'X-Success': true,
      'X-Service-ID': os.hostname()
    })

    return res.send({
      success: true,
      data: data
    })
  }

  /**
   * Return an error
   * @param  {String} error Error text
   * @return {res}          ExpressJS
   */
  res.error = error => {
    res.set({
      'X-Success': false,
      'X-Service-ID': os.hostname()
    })

    return res.send({
      success: false,
      errors: [
        {
          message: error
        }
      ]
    })
  }

  return next()
};
