import * as Joi from '@hapi/joi';

export const ContactSkillCreateSchema = Joi.object({
  name: Joi.string().required().max(120),
  description: Joi.string().allow('', null),
}).options({
  abortEarly: false,
});
