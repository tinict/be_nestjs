import * as Joi from '@hapi/joi';

export const UserUpdatePhoneSchema = Joi.object({
  phone: Joi.string().required(),
}).options({
  abortEarly: false,
});
