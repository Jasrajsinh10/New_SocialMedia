/**
 * PostsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const _ = require("lodash");

module.exports = {

  // Get post create page.
  getPostCreation: async (req, res) => {
    const user = req.session.user;
    if (user == undefined) {
      return res.redirect("/login")
    }
    else {
      res.view("postcreation", { user });
    }
  },

// Adding post to database and returning user to home page.
  postPostCreation: async (req, res) => {
    const user = req.session.user;
    console.log(req.session.user);
    const post = {
      username: user.username,
      userid: user.id,
      content: req.body.content
    };
    console.log(post)
    if (user == undefined) {
      res.redirect("/login");
    }
    else {
    
      const userpost = await Posts.create(post).fetch();
      console.log(userpost);
      res.redirect("/home");
    }
  },

  // Post like and Unlike code.
  postlike: async (req, res) => {
    try {
      const postid = req.params.id;
      const userid = req.session.user.id;
      const user = req.session.user;
      const post = await Posts.findOne({ id: postid });
      
      if (user == undefined) {
        return res.redirect("/login")
      }
      else {
        if (post) {
        
          let liked = post.likes
        
          const likedIndex = post.likes.indexOf(userid);
        

          if (likedIndex == -1) {
            // User has already liked the post, so remove the like
          
            liked.push(userid);
            console.log("liked");
            await Posts.update({ id: postid }, { likes: liked });

            return res.redirect("/home");
         
          } else {
            // User hasn't liked the post, so add the like
            liked.splice(likedIndex, 1);
            console.log("unliked");
            await Posts.update({ id: postid }, { likes: liked });
            return res.redirect("/home");
          }
        }
        else {
          return res.send("this is bullshit");
        }
      }
    }
    catch(error) {
      console.log(error);
    }
  },

  // route to mypost page foe user where all post of user are there
  getmypost: async (req, res) => {
    try {
      const user = req.session.user;
      if (user == undefined) {
        return res.redirect("/login");
      }
      else {
        const myposts = await Posts.find({ userid: user.id });
        res.view("Mypost",{myposts,user})
      }
    }
    catch (error) {
      console.log(error);
    }
  },

  // deletepost by id
  deletepost: async (req, res) => {
    try {
      if (req.session.user == undefined) {
        return res.redirect("/login");
       }
        let deletepost = await Posts.destroyOne({ id: req.params.id })
        console.log(deletepost);
        return res.redirect("/Myposts");
      
    }
    catch(err) {
      console.log(err);
    }
  },

  // Get editpost and username page
  editpost: async (req, res) => {
    try {
      const user = req.session.user;
      if (user == undefined) {
        return res.redirect("/login")
      }
      else {
        let post = await Posts.findOne({ id: req.params.id });
      
        return res.view("editpost", { post, user });
      }
    }
    catch(err) {
      console.log(err);
    }
  },

  // Edit the post content page 
  editingpost: async (req, res) => {
    try {
      if (req.session.user == undefined) {
        return res.redirect("/login")
       }
      let newcontent = req.body.content;
      let updatepost = await Posts.updateOne({ id: req.params.id }).set({ content: newcontent });
      console.log(updatepost.content);
      return res.redirect("/home");
    }
    catch(err) {
      console.log(err)
    }
  },

}
