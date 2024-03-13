import * as Joi from '@hapi/joi';

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

export const UserUpdatePasswordSchema = Joi.object({
  password: Joi.string().regex(passwordPattern).required(),
}).options({
  abortEarly: false,
});
