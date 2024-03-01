const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, proceed) => {
  try {
    //get authentiction token
  
    let token = req.cookies.Authorization;
    console.log("Middle token => ", token);
    if (token) {
      // verify token
     
      let decode = await sails.helpers.verifyToken(token);
      if (!decode) {
        return res.send("token verification failed");
      }
      req.user = decode;
      proceed();
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("Middleware Error => ", err)
    res.status(500).send({ status: 500, message: sails.__("authFail") });
  }
};