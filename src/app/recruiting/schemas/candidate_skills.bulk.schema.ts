import * as Joi from '@hapi/joi';

export const CandidateSkillBulkSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      name: Joi.string().required().max(255),
      description: Joi.string().allow(''),
    }),
  ),
}).options({
  abortEarly: false,
});
