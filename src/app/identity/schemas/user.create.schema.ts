import * as Joi from '@hapi/joi';

export const UserCreateSchema = Joi.object({
  name: Joi.string().required().max(120).allow('', null),
  description: Joi.string().allow('', null),
}).options({
  abortEarly: false,
});
