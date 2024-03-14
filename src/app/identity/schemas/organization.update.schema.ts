import * as Joi from '@hapi/joi';

export const OrganizationUpdateSchema = Joi.object({
  name: Joi.string().required().max(255),
  description: Joi.string().allow(null, ''),
  phone: Joi.string().allow(null, ''),
  address: Joi.string().allow(null, ''),
  thumbnail: Joi.string().allow(null, ''),
  status: Joi.number().allow(null),
  images: Joi.string().allow(null, ''),
  websites: Joi.string().allow(null, ''),
  socials: Joi.string().allow(null, ''),
  grade: Joi.number().allow(null),
  rate: Joi.number().allow(null),
  cover: Joi.string().allow(null, ''),
  avatar: Joi.string().allow(null, ''),
  code: Joi.string().allow(null, '').max(13),

  vision: Joi.string().allow(null, ''),
  mission: Joi.string().allow(null, ''),
  core_values: Joi.string().allow(null, ''),
  city_id: Joi.string().allow(null, ''),
  contry_id: Joi.string().allow(null, ''),
}).options({
  abortEarly: false,
});
