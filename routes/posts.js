const express = require('express');
const router = express.Router();
const settings = require('../settings');
const MongoDriver = require('../storage/mongoDriver');
const mongoDriver = new MongoDriver(settings.mongo);
mongoDriver.onConnection().then(() => {
  mongoDriver.handleError();
});


/**
GET /posts
*@return {Status} 200 {"message":"Success",result:posts}
*@return {Status} 500 Internal Server Error
*@memberof API
*/
router.get('/', async (req, res) => {
  try {
    const posts = await mongoDriver.post.getPosts(req.query.type);
    return res.status(200).json({
      message: "Success",
      result: posts
    });
  } catch (e) {
    return res.status(500);
  }
});

/**
POST /posts
*@param {Object} post req.body.post
*@return {Status} 200 {"message":"Success"}
*@return {Status} 500 Internal Server Error
*@memberof API
*/
router.post('/', async (req, res) => {
  try {
    await mongoDriver.post.savePost(req.body.post);
    return res.status(200).json({
      message: "Success"
    });
  } catch (e) {
    return res.status(500);
  }
});


module.exports = router;