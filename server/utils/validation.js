import Joi from "joi";

const email = Joi.string().email().required();
const name = Joi.string().required();
const password = Joi.string().required().min(6);

export const registerValidator = Joi.object({
  name,
  email,
  password,
});
