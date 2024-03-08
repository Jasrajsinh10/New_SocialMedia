/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getcomments: async (req, res) => {
    try {
      let check = await Posts.findOne({ id: req.params.id });
      if(!check) {
        return res.status(404).send('Comment not found');
      }
      else {
        let thispostcomments = await Comments.find({ postid: req.params.id });
        let post = await Posts.findOne({ id: req.params.id });
        const user = req.user;
        res.view('postcomment', { thispostcomments, post, user });
      }
    }
    catch(err) {
      console.log(err);
    }
  },

  postcomment: async (req, res) => {
    let check = await Posts.findOne({ id: req.params.id });
    if (!check) {
      res.status(404).send('Post not found');
    }
    const post = await Posts.findOne({ id : req.params.id });
    await Comments.create({
      userid: req.user.id,
      postid: post.id,
      text: req.body.text,
      username: req.user.username
    });
    const user = await User.findOne(req.user.id).populate('comments');
    console.log(user);
    return res.redirect('/home');
  },

  deletecomment: async (req, res) => {

    let deletecomment = await Comments.destroyOne({ id: req.params.id });
    if (deletecomment) {
      res.redirect('/home');
    }
    else {
      res.status(404).send('Comment not found');
    }
  }
};

