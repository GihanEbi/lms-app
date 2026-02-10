import Joi from "joi";

// Helper for availability validation
const availabilityItemSchema = Joi.object({
  day: Joi.string()
    .valid("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
    .required()
    .messages({
      "any.required": "Day is required in availability",
    }),
  slots: Joi.array()
    .items(
      Joi.string().valid("morning", "afternoon", "evening").messages({
        "any.only": "Slots must be one of 'morning', 'afternoon', or 'evening'",
      }),
    )
    .required()
    .messages({
      "any.required": "Slots are required in availability",
    }),
});

export const createInstructorPreferenceSchema = Joi.object({
  instructor_id: Joi.number().integer().required().messages({
    "any.required": "Instructor ID is required",
  }),
  teaching_methodology: Joi.string().optional().allow("").messages({
    "string.base": "Teaching methodology must be a string",
  }),
  student_capacity: Joi.number().integer().min(5).max(200).required().messages({
    "any.required": "Student capacity is required",
    "number.base": "Student capacity must be a number",
    "number.min": "Student capacity must be at least 5",
    "number.max": "Student capacity cannot exceed 200",
  }),

  // Validate URLs
  linkedin_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "LinkedIn URL must be a valid URI",
  }),
  portfolio_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Portfolio URL must be a valid URI",
  }),

  // JSON Grid Validation
  weekly_availability: Joi.array()
    .items(availabilityItemSchema)
    .optional()
    .messages({
      "array.base": "Weekly availability must be an array",
    }),

  // Array of Subject IDs for Expertise
  subject_ids: Joi.array()
    .items(Joi.number().integer())
    .unique()
    .required()
    .messages({
      "any.required": "At least one subject of expertise is required",
    }),
});

export const editInstructorPreferenceSchema = Joi.object({
  teaching_methodology: Joi.string().optional().allow("").messages({
    "string.base": "Teaching methodology must be a string",
  }),
  student_capacity: Joi.number().integer().min(5).max(200).optional().messages({
    "number.base": "Student capacity must be a number",
    "number.min": "Student capacity must be at least 5",
    "number.max": "Student capacity cannot exceed 200",
  }),
  linkedin_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "LinkedIn URL must be a valid URI",
  }),
  portfolio_url: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Portfolio URL must be a valid URI",
  }),
  weekly_availability: Joi.array()
    .items(availabilityItemSchema)
    .optional()
    .messages({
      "array.base": "Weekly availability must be an array",
    }),

  // Optional on edit, if provided it replaces existing
  subject_ids: Joi.array()
    .items(Joi.number().integer())
    .unique()
    .optional()
    .messages({
      "array.base": "Subject IDs must be an array of integers",
    }),
});
