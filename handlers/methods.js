const jwt = require("jsonwebtoken");

module.exports = user => {
  const login = (req, res, next) => {
    const { username, password } = req.body;

    if (
      user.find(
        user => user.username === username && user.password === password
      )
    ) {
      jwt.sign({ user }, "privatekey", { expiresIn: "1h" }, (err, token) => {
        if (err) {
          next(err);
        }
        res.send(token);
      });
    } else {
      const err = new Error(`user not found`);
      err.statusCode = 404;
      next(err);
    }
  };

  const createUser = (req, res, next) => {
    const { body } = req;
    user.push(body);
    res.status(201);
    res.send("user created");
  };

  return {
    createUser,
    login
  };
};
