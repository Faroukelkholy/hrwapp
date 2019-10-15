const express = require('express');
const router = express.Router();
const settings = require('../settings');
const MongoDriver = require('../storage/mongoDriver');
const mongoDriver = new MongoDriver(settings.mongo);
mongoDriver.onConnection().then(() => {
  mongoDriver.handleError();
});

router.post('/login', async (req, res)=>{
  const user = await mongoDriver.user.authenticateUser(req.body.user);
    if(!user){
      return res.status(200).json({
        message: "Invalid username/password"
      });
    } else {
      try{
        const access_token = await mongoDriver.token.saveToken(req.body.user);
        if(access_token){
          return res.status(200).json({
            message: "Success",
            user:user,
            access_token:access_token
          });
        } else {
          return res.status(500);
        }
      } catch(e){
        console.error('/login user.saveToken ',e);
        return res.status(500);
      }

    }
});

router.post('/logout', async (req, res)=>{
  
});

module.exports = router;
