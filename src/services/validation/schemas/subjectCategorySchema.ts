import Joi from "joi";

export const createSubjectCategorySchema = Joi.object({
  subject_category_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Subject Category Name is required",
    "string.min": "Subject Category Name must be at least 3 characters",
    "string.max": "Subject Category Name must be at most 255 characters",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
});

export const editSubjectCategorySchema = Joi.object({
  subject_category_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Subject Category Name is required",
    "string.min": "Subject Category Name must be at least 3 characters",
    "string.max": "Subject Category Name must be at most 255 characters",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  is_active: Joi.boolean().required().messages({
    "boolean.base": "is_active must be a boolean",
    "any.required": "is_active is required",
  }),
});
