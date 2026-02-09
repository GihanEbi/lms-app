import Joi from "joi";

export const createInstructorPersonalInformationSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must be at most 255 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }), // Plain text password input
  phone_number: Joi.string().min(10).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least 10 characters",
  }),
  highest_degree_certificate_id: Joi.number().integer().required().messages({
    "number.base": "Highest degree certificate ID must be a number",
    "number.integer": "Highest degree certificate ID must be an integer",
    "any.required": "Highest degree certificate ID is required",
  }),
  years_of_experience: Joi.number().integer().min(0).required().messages({
    "number.base": "Years of experience must be a number",
    "number.integer": "Years of experience must be an integer",
    "number.min": "Years of experience cannot be negative",
    "any.required": "Years of experience is required",
  }),
  date_of_birth: Joi.date().iso().required().messages({
    "date.base": "Date of birth must be a valid date",
    "date.iso": "Date of birth must be in ISO format (YYYY-MM-DD)",
    "any.required": "Date of birth is required",
  }),
  address: Joi.string().optional().required().messages({
    "string.base": "Address must be a string",
  }),

  // Optional Fields
  profile_picture_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Profile picture URL must be a valid URI",
  }),
  resume_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Resume URL must be a valid URI",
  }),
});

export const editInstructorPersonalInformationSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must be at most 255 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
  }),
  phone_number: Joi.string().min(10).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least 10 characters",
  }),
  highest_degree_certificate_id: Joi.number().integer().required().messages({
    "number.base": "Highest degree certificate ID must be a number",
    "number.integer": "Highest degree certificate ID must be an integer",
    "any.required": "Highest degree certificate ID is required",
  }),

  years_of_experience: Joi.number().integer().min(0).required().messages({
    "number.base": "Years of experience must be a number",
    "number.integer": "Years of experience must be an integer",
    "number.min": "Years of experience cannot be negative",
    "any.required": "Years of experience is required",
  }),
  date_of_birth: Joi.date().iso().required().messages({
    "date.base": "Date of birth must be a valid date",
    "date.iso": "Date of birth must be in ISO format (YYYY-MM-DD)",
    "any.required": "Date of birth is required",
  }),
  address: Joi.string().optional().required().messages({
    "string.base": "Address must be a string",
  }),

  // Optional Fields
  profile_picture_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Profile picture URL must be a valid URI",
  }),
  resume_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Resume URL must be a valid URI",
  }),
  is_active: Joi.boolean().required().messages({
    "boolean.base": "is_active must be a boolean",
    "any.required": "is_active is required",
  }),
});
