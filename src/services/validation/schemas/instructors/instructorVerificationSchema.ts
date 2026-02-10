import { certificateVerificationConstants } from "@/src/constants/instructorConstants";
import Joi from "joi";

export const createInstructorVerificationSchema = Joi.object({
  instructor_id: Joi.number().integer().required().messages({
    "any.required": "Instructor ID is required",
  }),

  // 🔄 CHANGED: Expect Array of Strings
  identity_document_urls: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one identity document is required",
      "string.uri": "Identity documents must be valid URLs",
    }),

  // 🔄 CHANGED: Expect Array of Strings
  certification_document_urls: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one certification document is required",
      "string.uri": "Certification documents must be valid URLs",
    }),

  professional_license_number: Joi.string().optional().allow(""),
  background_check_consent: Joi.boolean().valid(true).required(),
  digital_signature: Joi.string().min(3).required(),
});

export const editInstructorVerificationSchema = Joi.object({
  // 🔄 CHANGED: Optional Arrays
  identity_document_urls: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .optional()
    .messages({
      "array.min": "At least one identity document is required",
      "string.uri": "Identity documents must be valid URLs",
    }),
  certification_document_urls: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .optional()
    .messages({
      "array.min": "At least one certification document is required",
      "string.uri": "Certification documents must be valid URLs",
    }),

  professional_license_number: Joi.string().optional().allow("").messages({
    "string.base": "Professional license number must be a string",
  }),
  background_check_consent: Joi.boolean().optional().messages({
    "boolean.base": "Background check consent must be a boolean",
  }),
  digital_signature: Joi.string().optional().messages({
    "string.base": "Digital signature must be a string",
  }),
  status: Joi.string()
    .valid(
      certificateVerificationConstants.PENDING,
      certificateVerificationConstants.VERIFIED,
      certificateVerificationConstants.REJECTED,
    )
    .optional()
    .messages({
      "any.only": "Status must be one of 'pending', 'verified', or 'rejected'",
    }),
  rejection_reason: Joi.string().optional().allow("",null).messages({
    "string.base": "Rejection reason must be a string",
  }),
});
