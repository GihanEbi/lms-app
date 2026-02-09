import Joi from "joi";

export const createDegreeCertificateSchema = Joi.object({
  degree_certificate_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Degree Certificate Name is required",
    "string.min": "Degree Certificate Name must be at least 3 characters",
    "string.max": "Degree Certificate Name must be at most 255 characters",
  }),
  description: Joi.string().optional().empty("").messages({
    "string.base": "Description must be a string",
  }),
});

export const editDegreeCertificateSchema = Joi.object({
  degree_certificate_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Degree Certificate Name is required",
    "string.min": "Degree Certificate Name must be at least 3 characters",
    "string.max": "Degree Certificate Name must be at most 255 characters",
  }),
  description: Joi.string().optional().empty("").messages({
    "string.base": "Description must be a string",
  }),
  is_active: Joi.boolean().required().messages({
    "boolean.base": "is_active must be a boolean",
    "any.required": "is_active is required",
  }),
});
