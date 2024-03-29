/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv');

module.exports = {

  // Get signup page for user registeration
  getsignup: async (req, res) => {
    return res.view('signup');
  },

  // Get login page for user login and validation and return to login page if validation fails or on home page if validation succesful
  getlogin: async (req, res) => {
    return res.view('login');
  },

  // Add user details to database and password hashing and username and email validation and checking for same username and email
  // One username and password can only be used to open one account
  postsignup: async (req, res) => {
    try {
      const saltRounds = 10;
      const hashpassword = await bcrypt.hash(req.body.password, saltRounds);
      console.log(req.body.username);
      const checkusername = await User.find({ username: req.body.username });
      if (checkusername[0]) {
        req.addFlash('error', 'User with same username already exsists');
        console.log("USER ALREADY EXSISTS");
        return res.redirect("/signup");
      }
      const checkemail = await User.find({ email: req.body.email });
      if (checkemail[0]) {
        req.addFlash('error', 'User with same email already exsists');
        console.log(checkemail);
        console.log('chechuser1')
        return res.view('signup');
      }
      if (!validator.isLength(req.body.username, { min: 3 })) {
        req.addFlash('error', 'Name must be at least 3 characters long');
        console.log(checkemail);
        console.log('chechuser2')
        return res.redirect('/signup');
      }
      if (!validator.isLength(req.body.email, { min: 6 })) {
        req.addFlash('error', 'email must be at least 6 characters long');
        console.log(checkemail);
        console.log('chechuser3')
        return res.redirect('/signup');
      }
      if (!validator.isLength(req.body.password, { min: 5 })) {
        req.addFlash('error', 'password must be at least 5 characters long');
        console.log(checkemail);
        console.log('chechuser4')
        return res.redirect('/signup');
      }
      else {
        //create a newuser
        const newUser = await User.create({
          username: req.body.username,
          password: hashpassword,
          email: req.body.email
        }).fetch();
        console.log(newUser);
        return res.redirect('/login');
      }
    }
    catch(err) {
      console.log(err);
    }
  },

  // User details validation to see if details entered are correct or not
  // User can enter email or username and password
  postlogin: async (req, res) => {
    try {

      let checkuser = await User.findOne({username: req.body.username});
      if (!checkuser) {
        checkuser = await User.findOne({ email: req.body.username });
        if (!checkuser) {
          req.addFlash('error', 'Wrong credentials');
          console.log("dnbsdfbksjdfs");
          return res.redirect('/login');
        }
      }
      else {
        console.log("kao")
        const validPassword = await bcrypt.compare(req.body.password, checkuser.password);
        if (validPassword) {
          let token = await sails.helpers.generateToken(checkuser.username, checkuser.email, checkuser.id, '12h');
          let updatetoken = await User.updateOne({ id: checkuser.id }, { accesstoken: token });
          if (updatetoken) {
            res.cookie('Authorization', token, {
              path: '/',
              maxAge: 1*60*60*1000,
              secure: true,
              httpOnly: true
            });
          }
          
          return res.redirect(`/home?id=${checkuser.id}`);
        }
        else {
          req.addFlash('error', 'Wrong credentials');
          console.log("ekkkakkaka");
          return res.redirect('/login');
        }
      }
    }
    catch(err) {
      console.log(err);
    }
  },

  // Route to home page where all post are shown and session checking
  gethome: async (req, res) => {
    try { 
      console.log(req.query.id);
      const users = await User.find({ id: req.query.id });
      const user = users[0]
      const page = req.query.page || 1; // Current page number
      const limit = 8; // Number of items per page
      const skip = (page - 1) * limit; // Calculate the number of items to skip
      const totalCount = await Posts.count(); // Total number of items in the database
      const totalPages = Math.ceil(totalCount / limit); // Calculate total pages
      const postall = await Posts.find().limit(limit).skip(skip); // Fetch items for the current page


      return res.view('home', {
        user,
        postall,
        totalPages,
        currentPage: page
      });

    }
    catch (error) {
      console.log(error);
    }
  },



  // edit username
  editingusername: async (req, res) => {
    try {
      let user = await User.findOne({ id: req.params.id });
      console.log('kjdskj');
      if (!user) {
        return res.status(500).send('USER DOESNOT EXSISTS');
      }

      await User.updateOne({ id: user.id }, { username: req.body.username });
      await Posts.update({ userid: user.id }, { username: req.body.username });
      await Comments.update({ userid: user.id }, { username: req.body.username });
      res.redirect(`/home?id=${user.id}`);
    }
    catch (err) {
      console.log(err);
    }
  },

  // logout user
  logout: async (req, res) => {
    try {
      res.clearCookie('Authorization');
      return res.redirect('/login');
    }
    catch(err) {
      console.log(err);
    }
  }

};

