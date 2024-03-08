/**
 * Posts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */



module.exports = {

  attributes: {
    // The content of the post
    content: {
      type: 'string',
      required: true
    },

    // Reference to the user who created the post
    userid: {
      model:'User', // Assuming user ID is stored as a string
      required: true
    },

    // Date and time when the post was created
    createdAt: {
      type: 'number',
      autoCreatedAt: true
    },

    // Date and time when the post was last updated
    updatedAt: {
      type: 'number',
      autoUpdatedAt: true
    },

    // Likes associated with the post
    likes: {
      type: 'json',
      columnType:'array',
      defaultsTo: []
    }
  }

};
