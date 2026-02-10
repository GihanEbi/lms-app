import Joi from "joi";
import { certificateVerificationConstants } from "@/src/constants/instructorConstants";

export const verifyRejectCertificateSchema = Joi.object({
  instructor_id: Joi.number().integer().required().messages({
    "any.required": "Instructor ID is required",
    "number.base": "Instructor ID must be a number",
  }),
  status: Joi.string()
    .valid(
      certificateVerificationConstants.VERIFIED,
      certificateVerificationConstants.REJECTED,
    )
    .required()
    .messages({
      "any.only": "Status must be either 'verified' or 'rejected'",
    }),
  rejection_reason: Joi.string()
    .when("status", {
      is: certificateVerificationConstants.REJECTED,
      then: Joi.required(),
      otherwise: Joi.optional().allow("", null),
    })
    .messages({
      "any.required": "Rejection reason is required when rejecting documents",
    }),
});
