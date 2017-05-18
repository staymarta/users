/**
 * Some stuff for services ExpressJS
 */

module.exports = (req, res, next) => {
  /**
   * Return success.
   * @param  {*} data      Data to return
   * @return {res}         ExpressJS
   */
  res.success = data => {
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
