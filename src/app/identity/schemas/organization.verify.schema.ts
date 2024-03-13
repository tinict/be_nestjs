import * as Joi from '@hapi/joi';

export const OrganizationVerifySchema = Joi.object({
  organization_id: Joi.string().required(),
  verified_flag: Joi.number(),
}).options({
  abortEarly: false,
});
