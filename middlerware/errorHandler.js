const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}\t${req.method}\t${req.url}`);
  console.log(err);
  if (res.headersSent) {
    return next(err); // Do not attempt to send a response if headers have already been sent
  }
  // res.status(500).send(err.message);
};

module.exports = errorHandler;
