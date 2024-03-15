import * as Joi from '@hapi/joi';

export const CampaignProposalPositionConditionCreateSchema = Joi.object({
  name: Joi.string().required().max(120),
  description: Joi.string().allow('', null),
}).options({
  abortEarly: false,
});