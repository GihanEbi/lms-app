import Joi from "joi";

export const createUserGroupsSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 50 characters",
  }),
  description: Joi.string().max(255).optional().messages({
    "string.max": "Description must be at most 255 characters",
  }),
});

// edit user group
export const editUserGroupsSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 50 characters",
  }),
  description: Joi.string().max(255).optional().messages({
    "string.max": "Description must be at most 255 characters",
  }),
  is_active: Joi.boolean().required().messages({
    "boolean.base": "is_active must be a boolean",
    "any.required": "is_active is required",
  }),
});
