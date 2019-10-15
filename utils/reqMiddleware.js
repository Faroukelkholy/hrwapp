const settings = require('../settings');
const MongoDriver = require('../storage/mongoDriver');
const mongoDriver = new MongoDriver(settings.mongo);
mongoDriver.onConnection().then(() => {
  mongoDriver.handleError();
});

async function authenticate(req, res, next) {
  if (req.method === 'OPTIONS') {
    console.log('middlewate req.method:', req.method);
    next();
  } else if (req.headers.authorization) {
    console.log('middlewate req.method:', req.method);
    const [type, token] = req.headers.authorization.split(" ");
    const tokenQueried = await mongoDriver.token.findAccessToken(token);
    if (tokenQueried) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
}

module.exports = {
  authenticate: authenticate
};