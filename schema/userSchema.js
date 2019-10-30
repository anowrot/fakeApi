const Joi = require("@hapi/joi");

module.exports = {
  userSchema: Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,6}$/)
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  })
};
