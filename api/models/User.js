module.exports={
  attributes:{
    username:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      required:true
    },
    password:{
      type:'string',
      required:true
    },
    accesstoken: {
      type: 'string',
      required: false
    },
    comments:{
      collection: 'Comments',
      via:'userid'
    }
  }
};
