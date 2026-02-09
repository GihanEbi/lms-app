import Joi from 'joi';

export const rulesSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
  }),
  code: Joi.string().required().label('Code').messages({
    'string.empty': 'Code is required',
  }),
});