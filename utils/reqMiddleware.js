var when = require("when");

function formParser(form, req) {
  return when.promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) {
        return reject(err);
      }
        const post = {};
        if (fields._id) {
          post._id = fields._id[0];
        }
        if (fields.type) {
          post.type = fields.type[0];
        }
  
        if (fields.title) {
          post.title = fields.title[0];
        }
  
        if (fields.description) {
          post.description = fields.description[0];
        }
        if (fields.hr) {
          var hr = {};
          hr.name = fields.hr[0];
          hr.email = fields.hr[1];
          hr.mobile = fields.hr[2];
          hr.title = fields.hr[3];
          hr.gender = fields.hr[4];
          post.hr = hr;
        }
        return resolve(post);
    });
  });
}


function authenticate(req, res, next){
    if(req.access_token){
      console.log('middlewate req.access_token:',req.access_token);
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
}

module.exports = {
  formParser: formParser,
  authenticate:authenticate
};