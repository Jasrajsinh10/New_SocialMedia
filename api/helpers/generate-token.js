const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
  friendlyName: 'Generate token',

  description: '',

  inputs: {
    username: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true
    },
    id: {
      type: 'string',
      required: true
    },
    expiresIn:{
      type: 'string',
      required: true,
    }
  },

  exits: {
    success: {
      description: 'Token is generate.',
    },
    error: {
      description: 'Token is not generate',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { username,email,id, expiresIn } = inputs;
      //generate token
      const token = jwt.sign(
        {
          username,email,id
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn,
        }
      );
      return exits.success(token);
    } catch (error) {
      return exits.error(error);
    }
  },
};
