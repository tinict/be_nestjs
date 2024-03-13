import * as Joi from '@hapi/joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

export const UserUpdateSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().regex(emailPattern).required(),
  address: Joi.string().allow('', null),
  description: Joi.string().allow('', null),
}).options({
  abortEarly: false,
});
