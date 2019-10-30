const Joi = require("@hapi/joi");
const { userSchema } = require("./userSchema");

module.exports = {
  validateUserSchema(req, res, next) {
    const { body } = req;

    try {
      Joi.assert(body, userSchema);
      next();
    } catch (error) {
      const errorMessages = error.details.map(
        singleError => singleError.message
      );
      const err = new Error(errorMessages);
      err.statusCode = 400;
      next(err);
    }
  }
};
