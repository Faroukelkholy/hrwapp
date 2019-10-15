const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstname: {
    type: String,
    lowercase: true
  },
  lastname: {
    type: String,
    lowercase: true
  },
  name: {
    type: String,
    lowercase: true
  },
  email: String,
  password: {
    type: String,
    required: true
  },
  mobile: String,
  title: String, 
  job: String, 
  gender: String,
  dob: String,
  address: String,
  addedBy: {
    name: String,
    email: String,
    mobile: String,
    gender: String,
    title: String,
    job: String
  }
});

userSchema.statics.authenticateUser = function authenticateUser(user) {
  const password = crypto.createHash("md5").update(user.password).digest("hex");
  return this.findOne({
      email: user.email.toLowerCase(),
      password:password
  },{
    _id:0,
    password:0,
    firstname:0,
    lastname:0,
    dob:0,
    addedBy:0
});
};

userSchema.statics.saveUser = function saveUser(user, hr) {
  const userCreated = new this(user);
  userCreated.name = user.firstname + " " + user.lastname;
  const userToUpsert = userCreated.toObject();
  delete userToUpsert._id;
  const options = {
    upsert: true
  };
  return this.updateOne({
      email: user.email
    }, {
      $setOnInsert: userToUpsert,
      $push: {
        "addedBy": hr
      }
    },
    options);
};

userSchema.statics.getUsers = function getUsers() {
  return this.find({}, {
    _id: 0,
    password:0,
    addedBy:0
  });
};

userSchema.statics.findUser = function findUser(user) {
  return this.find({
    email: user.email
  });
};

userSchema.statics.deleteUser = function deleteUser(email) {
  return this.deleteOne({
    email: email
  });
};


userSchema.statics.fetchProfile = function fetchProfile(user) {
  return this.findOne({
    email: user.email
  }, {
    _id: 0,
    name: 1,
    title: 1,
    job: 1,
    email: 1,
    mobile: 1,
    address:1
  });
};

userSchema.statics.editProfileByHR = function editProfileByHR(user) {
  return this.updateOne({
    email: user.email
  }, {
    $set: {
      mobile: user.mobile,
      address: user.address,
      title: user.title,
      job: user.job,
      gender: user.gender,
      dob: user.dob
    }
  });
};

userSchema.statics.editProfileByUser = function editProfileByUser(user) {
  return this.updateOne({
    email: user.email
  }, {
    $set: {
      mobile: user.mobile,
      address: user.address
    }
  });
};

userSchema.statics.checkCurrentPassword = function checkCurrentPassword(email, password) {
  const hasedPassword = crypto.createHash("md5").update(password).digest("hex");
  return this.findOne({
    email: email,
    password: hasedPassword
  }, {
    _id: 0,
    password: 1
  });
};

userSchema.statics.changePassword = function changePassword(email, password) {
  const hasedPassword = crypto.createHash("md5").update(password).digest("hex");
  return this.updateOne({
    email: email
  }, {
    $set: {
      password: hasedPassword
    }
  })
}


userSchema.index({
  emails: 1
}, {
  unique: true,
  sparse: true
});

module.exports = userSchema;
