const jwt = require("jsonwebtoken");
require("dotenv");
module.exports = {
  friendlyName: "Verify token",

  description: "",

  inputs: {
    token: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Token verify",
    },
    error: {
      description: "Invalid token.",
    },
  },

  fn: async function (inputs, exits) {
    let { token } = inputs;
    try {
      //decode token
      let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
   

      // get user data by id
      let isUser = await User.findOne({ id: decode.id });
      if (isUser) {
       
        return exits.success(decode);
      } else {
        console.log("mera error");
        exits.error(error);
      }
    } catch (err) {
      console.log(err);
      exits.error(err);
    }
  },
};
