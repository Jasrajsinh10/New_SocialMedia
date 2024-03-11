/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'flash',
      'favicon',
    ],
    flash: function(req, res, next) {
      // Define your flash middleware logic here
      // For example, you might want to attach `req.flash` functionality
      req.flash = function (type, message) {
        console.log('req.flash');
        console.log(type, message);
        if (!req.session.flash) {
          req.session.flash = {};
        }
        console.log(req.session.flash);
        if (!req.session.flash[type]) {
          req.session.flash[type] = [];
        }
        console.log(req.session.flash);
        req.session.flash[type].push(message);
        console.log(req.session.flash);
      };
      // Call next() to proceed to the next middleware
      next();
    },

    // session: require('express-session')({
    //   secret: 'yourSecretKey',
    //   cookie: {
    //     maxAge: 60 * 60 * 1000 // 1 hour
    //   },
    //   resave: false,
    //   saveUninitialized: true
    // })

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },

};
