import Joi from "joi";

export const createSubjectSchema = Joi.object({
  subject_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Subject Name is required",
    "string.min": "Subject Name must be at least 3 characters",
    "string.max": "Subject Name must be at most 255 characters",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  subject_category_id: Joi.number().integer().required().messages({
    "number.base": "Subject Category ID must be a number",
    "any.required": "Subject Category ID is required",
  }),
});

export const editSubjectSchema = Joi.object({
  subject_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Subject Name is required",
    "string.min": "Subject Name must be at least 3 characters",
    "string.max": "Subject Name must be at most 255 characters",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  subject_category_id: Joi.number().integer().required().messages({
    "number.base": "Subject Category ID must be a number",
    "any.required": "Subject Category ID is required",
  }),
  is_active: Joi.boolean().required().messages({
    "boolean.base": "is_active must be a boolean",
    "any.required": "is_active is required",
  }),
});
