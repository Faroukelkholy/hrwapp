const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const moment = require("moment");
const uuidv4 = require('uuid/v4');

const tokenSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  last_login: String
});

tokenSchema.statics.saveToken = function saveToken(user) {
  console.log("saveToken");
  let access_token = uuidv4();
  const tokenCreated = new this();
  tokenCreated.access_token = access_token;
  const last_login = moment(new Date()).format('D MMM YYYY,h:mm:ss a');
  tokenCreated.last_login = last_login;
  const options = {
    upsert: true
  };
  return this.updateOne({
      email: user.email
    }, {
      $set: {
        access_token: access_token,
        last_login: last_login
      }
    },
    options).then((to)=>{
        return Promise.resolve(access_token);
    }).otherwise((err)=>{
      console.log("saveToken err:",err);
       return Promise.reject(err);
    });
};

tokenSchema.statics.updateToken = function updateToken(user, access_token) {
  console.log("updateToken");
  const tokenCreated = new this();
  tokenCreated.access_token = access_token;
  return this.updateOne({
    email: user.email
  }, {
    $set: {
      access_token: access_token
    }
  });
};

tokenSchema.statics.findAccessToken = function saveToken(accessToken) {
  console.log("findAccessToken");
  return this.findOne({
    access_token: accessToken
  });
}

tokenSchema.statics.removeToken = function removeToken(accessToken) {
  console.log("deleteToken");
  return this.deleteOne({
    access_token: accessToken
  });
}


module.exports = tokenSchema;
