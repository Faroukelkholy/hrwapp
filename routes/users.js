const express = require('express');
const router = express.Router();
const settings = require('../settings');
const MongoDriver = require('../storage/mongoDriver');
const mongoDriver = new MongoDriver(settings.mongo);
mongoDriver.onConnection().then(() => {
  mongoDriver.handleError();
});


/**
GET /users
*@return {Status} 200 {"message":"Success",result:users}
*@return {Status} 500 Internal Server Error
*@memberof API
*/
router.get('/', async (req, res) => {
  try {
    const users = await mongoDriver.user.getUsers();
    return res.status(200).json({
      message: "Success",
      result: users
    });
  } catch (e) {
    return res.status(500);
  }
});

/**
POST /users
*@param {Object} user req.body.user
*@param {Object} hr req.body.hr
*@return {Status} 200 {"message":"Success"}
*@return {Status} 500 Internal Server Error
*@memberof API
*/
router.post('/', async(req, res) => {
  try {
     await mongoDriver.user.saveUser(req.body.user,req.body.hr);
    return res.status(200).json({
      message: "Success"
    });
  } catch(e) {
    return res.status(500);
  }
});


module.exports = router;