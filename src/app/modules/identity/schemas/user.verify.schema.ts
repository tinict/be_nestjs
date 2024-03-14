import * as Joi from '@hapi/joi';

export const UserVerifySchema = Joi.object({
  user_id: Joi.string().required(),
  verified_flag: Joi.number(),
}).options({
  abortEarly: false,
});
