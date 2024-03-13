import * as Joi from '@hapi/joi';

const pattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

export const LoginSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().regex(pattern).required(),
}).options({
  abortEarly: false,
});
