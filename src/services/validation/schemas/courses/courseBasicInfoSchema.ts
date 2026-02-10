import { courseLevels } from "@/src/constants/courseConstants";
import Joi from "joi";

export const courseBasicInfoSchema = Joi.object({
  instructor_id: Joi.number().integer().required().messages({
    "any.required": "Instructor ID is required",
    "number.base": "Instructor ID must be a number",
  }),

  title: Joi.string().min(5).max(255).required().messages({
    "string.empty": "Course title is required",
    "string.min": "Title must be at least 5 characters long",
  }),
  subtitle: Joi.string().max(255).required().messages({
    "string.empty": "Course subtitle is required",
  }),

  // 🔄 CHANGED: Validating ID instead of string
  category_id: Joi.number().integer().required().messages({
    "any.required": "Course category is required",
    "number.base": "Category ID must be a number",
  }),

  level: Joi.string()
    .valid(
      courseLevels.BEGINNER,
      courseLevels.INTERMEDIATE,
      courseLevels.ADVANCED,
      courseLevels.ALL_LEVELS,
    )
    .required()
    .messages({
      "any.required": "Course level is required",
      "any.only": `Level must be one of: ${Object.values(courseLevels).join(", ")}`,
    }),

  description: Joi.string().required().messages({
    "string.empty": "Course description is required",
  }),
  thumbnail_url: Joi.string().uri().required().messages({
    "string.empty": "Thumbnail URL is required",
    "string.uri": "Thumbnail URL must be a valid URI",
  }),
  promo_video_url: Joi.string().uri().required().messages({
    "string.empty": "Promotional video URL is required",
    "string.uri": "Promotional video URL must be a valid URI",
  }),
});
