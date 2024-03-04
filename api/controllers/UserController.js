/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const validator = require("validator");

module.exports = {

  // Get signup page for user registeration
  getsignup: async (req, res) => { 
      return res.view("signup");
  },

  // Get login page for user login and validation and return to login page if validation fails or on home page if validation succesful
  getlogin: async (req, res) => {
      return res.view("login");
  },
  
  // Add user details to database and password hashing and username and email validation and checking for same username and email
  // One username and password can only be used to open one account
  postsignup: async (req, res) => { 
    try {  
      const saltRounds = 10;
      const hashpassword = await bcrypt.hash(req.body.password, saltRounds);
      const checkusername = await User.findOne({ username: req.body.username });
      if (checkusername) {
        req.addFlash('error', 'User with same username already exsists');
        return res.view("signup");
      }
      const checkemail = await User.findOne({ email: req.body.email });
      if (checkemail) {
        req.addFlash('error', 'User with same email already exsists');
          return res.view("signup");
      }
      if (!validator.isLength(req.body.username, { min: 3 })) {
        req.addFlash('error', 'Name must be at least 3 characters long')
        return res.redirect('/signup')
      }
      if (!validator.isLength(req.body.email, { min: 6 })) {
        req.addFlash('error', 'email must be at least 6 characters long')
        return res.redirect('/signup')
      }
      if (!validator.isLength(req.body.password, { min: 5 })) {
        req.addFlash('error', 'Name must be at least 5 characters long')
        return res.redirect('/signup')
      }
      else {
        //create a newuser
        const newUser = await User.create({
          username: req.body.username,
          password: hashpassword,
          email: req.body.email
        }).fetch();
        console.log(newUser);
        return res.view("login"); 
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
          return res.redirect("/login");
        }
      }
      else {
        const validPassword = await bcrypt.compare(req.body.password, checkuser.password)
        if (validPassword) { 
          
          let token = await sails.helpers.generateToken(checkuser.username, checkuser.email, checkuser.id, "12h");
          let updatetoken = await User.updateOne({ id: checkuser.id }, { accesstoken: token });
          if (updatetoken) {
            res.cookie('Authorization', token, {
              path: '/',
              maxAge: 1*60*60*1000,
              secure: true,
              httpOnly: true
            });
          }
          return res.redirect("/home");
        }
        else {
          req.addFlash('error', 'Wrong credentials');
          return res.redirect("/login");
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
       const page = req.query.page || 1; // Current page number
    const limit = 8; // Number of items per page
    const skip = (page - 1) * limit; // Calculate the number of items to skip
      const user = req.user;
      const totalCount = await Posts.count(); // Total number of items in the database
      const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

      const postall = await Posts.find().limit(limit).skip(skip); // Fetch items for the current page

     
      console.log()
      return res.view("home", {
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
      if (req.user == undefined) {
        return res.redirect("/login")
      }
     
      let user = User.findOne({ id: req.params.id });
      if (!user) {
        return res.send
      }
      
      await User.updateOne({ id: user.id }, { username: req.body.username });
      await Posts.update({ userid: user.id }, { username: req.body.username });
      await Comments.update({ userid: user.id }, { username: req.body.username });
  req.user.username = req.body.username; 
  res.redirect("/home");
    }
    catch (err) {
      console.log(err)
    }
  },

  // logout user
  logout: async (req, res) => {
    try {
      res.clearCookie('Authorization');
  return res.redirect("/login");
    }
    catch(err) {
      console.log(err)
    }
  }

};

