const requestIp = require("request-ip");

const ipMiddleware = function (req, res, next) {
  req.clientIP = requestIp.getClientIp(req);
  console.log("requestIp", requestIp.getClientIp(req));
  console.log("requestIp", req.clientIP);
  next();
};

module.exports = ipMiddleware;
