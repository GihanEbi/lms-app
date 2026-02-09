import Joi from "joi";

export const createUserSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must be at most 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  phone_no: Joi.string().min(10).max(20).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least 10 characters",
    "string.max": "Phone number must be at most 20 characters",
  }),
  profile_image_url: Joi.string().uri().max(255).optional().messages({
    "string.uri": "Profile image URL must be a valid URI",
    "string.max": "Profile image URL must be at most 255 characters",
  }),
  password: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be at most 255 characters",
  }),
  group_id: Joi.number().integer().required().messages({
    "number.base": "Group ID must be a number",
    "number.integer": "Group ID must be an integer",
    "any.required": "Group ID is required",
  }),
});

export const editUserSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must be at most 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  phone_no: Joi.string().min(10).max(20).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least 10 characters",
    "string.max": "Phone number must be at most 20 characters",
  }),
  profile_image_url: Joi.string().uri().max(255).optional().messages({
    "string.uri": "Profile image URL must be a valid URI",
    "string.max": "Profile image URL must be at most 255 characters",
  }),
  group_id: Joi.number().integer().required().messages({
    "number.base": "Group ID must be a number",
    "number.integer": "Group ID must be an integer",
    "any.required": "Group ID is required",
  }),
  is_active: Joi.boolean().required().messages({
    "boolean.base": "is_active must be a boolean",
    "any.required": "is_active is required",
  }),
});
