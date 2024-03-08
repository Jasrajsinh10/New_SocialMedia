/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'UserController.gethome',

  // going from signup page to login page and adding a new user
  'POST /postsignup': 'UserController.postsignup',

  // going from login page to home page
  'POST /postlogin': 'UserController.postlogin',

  // getting a login page
  'GET /login': 'UserController.getlogin',

  // getting a signup page
  'GET /signup': 'UserController.getsignup',

  // getting a post creation page
  'GET /postcreation': 'PostsController.getPostCreation',

  // making a post by the loged in user and time when created
  'POST /userpostcreate': 'PostsController.postPostCreation',

  // liking a post for user
  'POST /like/:id': 'PostsController.postlike',

  // getting home page
  'GET /home': 'UserController.gethome',

  // getting all user posts
  'GET /Myposts': 'PostsController.getmypost',

  // delete post
  'POST /delete/:id': 'PostsController.deletepost' ,

  // Get editpost page
  'GET /edit/:id': 'PostsController.editpost',

  // Edit Post by id
  'POST /edit/:id': 'PostsController.editingpost',

  // Edit Username
  'POST /editusername/:id': 'UserController.editingusername',

  // GET all comments of posts
  'GET /comment/:id': 'CommentController.getcomments',

  // POST the comment in post
  'POST /postcomment/:id': 'CommentController.postcomment',

  // Logout for user
  'GET /logout': 'UserController.logout',

  // delete post by id
  'POST /deletecomment/:id' : 'CommentController.deletecomment'

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
