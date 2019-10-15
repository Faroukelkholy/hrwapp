const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const post_Schema = new Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: { 
    type: String,
    default: ""
  },
  hr: {
    name: String,
    email: String,
    mobile:String,
    gender:String,
    title: String,
    job: String
  }
});

post_Schema.statics.savePost = function savePost(post) {
  const postCreated = new this(post);
  const postToUpsert = postCreated.toObject();
  delete postToUpsert._id;
  const options = {
    upsert: true
  };
  return this.updateOne({
      "hr.email": post.hr.email,
      "description": post.description
    }, {
      $setOnInsert: postToUpsert
    },
    options);
};



post_Schema.statics.getPost = function getPost(post) {
  return this.aggregate([{
      $match: {
        _id: ObjectID(post._id),
        type: post.type
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]);

};


post_Schema.statics.editPost = function editPost(post) {
  const _id = post.post_id
  delete post.post_id;
  return this.updateOne({
    _id: _id
  }, {
    $set: post
  });
};

post_Schema.statics.deletePost = function deletePost(post) {
  const _id = post.post_id
  return this.updateOne({
    _id: _id
  }, {
    $set: {
      post_status: "0"
    }
  });
};



module.exports = post_Schema;
