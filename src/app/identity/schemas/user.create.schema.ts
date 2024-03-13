import * as Joi from '@hapi/joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

export const UserCreateSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().regex(emailPattern).required(),
  phone: Joi.string().required(),
  password: Joi.string().regex(passwordPattern).required(),
}).options({
  abortEarly: false,
});
