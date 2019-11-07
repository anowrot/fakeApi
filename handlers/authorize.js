const jwt = require("jsonwebtoken");
let _ = require("underscore");

module.exports = {
  checkToken(req, res, next) {
    const header = req.headers["authorization"];

    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1];
      req.token = token;
      next();
    } else {
      const err = new Error(`missing token`);
      err.statusCode = 401;
      next(err);
    }
  },
  isAuthorized(req, res, next) {
    jwt.verify(req.token, "privatekey", err => {
      if (err) {
        const err = new Error(`invalid token`);
        err.statusCode = 401;
        next(err);
      } else {
        next();
      }
    });
  },
  isSecure(req, res, next) {
    securePaths = ["/employees"];

    if (_.contains(securePaths, req.path)) return next();

    const err = new Error(`page not found`);
    err.statusCode = 404;
    next(err);
  }
};
