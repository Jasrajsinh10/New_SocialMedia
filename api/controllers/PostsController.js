/**
 * PostsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  // Get post create page.
  getPostCreation: async (req, res) => {
    const user = req.user;
    if (user === undefined) {
      return res.redirect('/login');
    }
    else {
      res.view('postcreation', { user });
    }
  },

  // Adding post to database and returning user to home page.
  postPostCreation: async (req, res) => {
    const users = await User.find({ id: req.query.id });
    const user = users[0];
    const post = {
      username: user.username,
      userid: user.id,
      content: req.body.content
    };
    // console.log("this is iit");
    
      const userpost = await Posts.create(post).fetch();
    if (userpost) {
      res.redirect(`/home?id=${user.id}`);
    }
    else {
      return res.status(500).send("SERVER_ERROR");
    }
  },

  // Post like and Unlike code.
  postlike: async (req, res) => {

    try {
      const postid = req.params.id;
      const post = await Posts.findOne({ id: postid });
      const userid = req.query.uid;
      const user = await User.findOne({ id: userid });

      if (user === undefined) {
        return res.redirect('/login');
      }
      else {
        if (post) {

          let liked = post.likes;

          const likedIndex = post.likes.indexOf(userid);


          if (likedIndex === -1) {
            // User has already liked the post, so remove the like

            liked.push(userid);
            await Posts.update({ id: postid }, { likes: liked });
            return res.redirect(`/home?id=${user.id}`);
          } else {
            // User hasn't liked the post, so add the like
            liked.splice(likedIndex, 1);
            await Posts.update({ id: postid }, { likes: liked });
            return res.redirect(`/home?id=${user.id}`);
          }
        }
        else {
          return res.send('this is bullshit');
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
     
      const user = await User.findOne({ id: req.query.id });
     
      const myposts = await Posts.find({ userid: req.user.id });
      res.view('Mypost',{myposts,user});

    }
    catch (error) {
      console.log(error);
    }
  },

  // deletepost by id
  deletepost: async (req, res) => {
    try {
      let post = await Posts.findOne({ id: req.params.id });
      if (!post) {
        return res.status(404).send('Post Not Found');
      }
      await Posts.destroyOne({ id: req.params.id });

      return res.redirect(`/Myposts?id=${post.userid}`);

    }
    catch(err) {
      console.log(err);
    }
  },

  // Get edit post and username page
  editpost: async (req, res) => {
    try {
 
        let post = await Posts.findOne({ id: req.params.id });
      const user = await User.findOne({ id: post.userid });
      if (!post) {
         return res.status(400).send("Post is is incorrect");

      }
      else {
         return res.view('editpost', { post, user });
      }
      
    }
    catch(err) {
      console.log(err);
    }
  },

  // Edit the post content page
  editingpost: async (req, res) => {
    try {
      const pid = req.params.id;
      console.log("gjhgjhgjh",pid);
      let post = await Posts.findOne({ id: pid });
      console.log(post);
      const user = await User.findOne({ id: post.userid });
      console.log("2");
      if (!post) {
        return res.status(404).send('Post Not Found');
      }
      console.log("here")
      let newcontent = req.body.content;
      console.log(newcontent);
      const id = { id: pid };
      const con = { content: newcontent };
      let updatepost = await Posts.update(id,con).fetch();
      console.log("hjjhgjgj",updatepost);
      return res.redirect(`/home?id=${user.id}`);
    }
    catch(err) {
      console.log(err);
    }
  },

};
