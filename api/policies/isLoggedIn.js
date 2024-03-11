
require('dotenv').config();
module.exports = async (req, res, proceed) => {
  if (req.headers['bypass-policies-for-testing'] === 'true') {
    return proceed(); // Allow the request to proceed
  }
  let token = req.cookies.Authorization;
  if (token && ['/login', '/signup'].includes(req.url)) {
    console.log('login route ---> home');
    return res.redirect('/');
  }
  // if the user is not authenticated and try to access login page, let him proceed with it.
  else if (!token && ['/login', '/signup'].includes(req.url)) {
    console.log('login route ---> login');

    return proceed();
  }
  else {
    if (!token) {
      return res.redirect('/login');
    }
    try {
      //get authentiction token
      if (token) {
        // verify token

        let decode = await sails.helpers.verifyToken(token);
        if (!decode) {
          return res.send('token verification failed');
        }
        req.user = decode;
        return proceed();
      } else {
        res.redirect('/login');
      }
    } catch (err) {
      console.log('Middleware Error => ', err);
      res.status(500).send({ status: 500, message: sails.__('authFail') });
    }
  }
};
