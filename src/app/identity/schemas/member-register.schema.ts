import * as Joi from '@hapi/joi';

export const MemberRegisterSchema = Joi.object({
  username: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
});
