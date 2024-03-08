/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  UserController: {
    gethome: 'isLoggedIn',
    getsignup: 'isLoggedIn',
    getlogin: 'isLoggedIn',

  },
  PostsController: {

    getPostCreation: 'isLoggedIn',
    postPostCreation: 'isLoggedIn',
    postlike: 'isLoggedIn',
    getmypost: 'isLoggedIn',
    deletepost: 'isLoggedIn',
    editingpost: 'isLoggedIn',
    editpost: 'isLoggedIn'
  },
  CommentController: {
    getcomments: 'isLoggedIn',
    postcomment: 'isLoggedIn',
    deletecomment: 'isLoggedIn',
  }


};
