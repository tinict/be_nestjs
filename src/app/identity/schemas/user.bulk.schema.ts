import * as Joi from '@hapi/joi';

export const UserBulkSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      name: Joi.string().required().max(255).allow('', null),
      description: Joi.string().allow(''),
    }),
  ),
}).options({
  abortEarly: false,
});
