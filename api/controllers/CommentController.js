/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getcomments: async (req, res) => {
    try {
      if (req.user == undefined) {
        res.redirect("/login")
      }
      else {
        let thispostcomments = await Comments.find({ postid: req.params.id });
        let post = await Posts.findOne({ id: req.params.id });
        const user = req.user;
        res.view("postcomment", { thispostcomments, post, user });
      }
    }
    catch(err) {
      console.log(err)
    }
  },

  postcomment: async (req, res) => {
    if (req.user == undefined) {
      res.redirect("/login")
    }
    const post = await Posts.findOne({ id : req.params.id });
    const newcomment= await Comments.create({
      userid: req.user.id,
      postid: post.id,
      text: req.body.text,
      username: req.user.username
    })
    const user = await User.findOne(req.user.id).populate('comments');
    return res.redirect("/home");
  },

  deletecomment: async (req, res) => {
    let deletecomment = await Comments.destroyOne({ id: req.params.id });
    res.redirect("/home");
  }
};

