import Joi from "joi";
import { instructorRegistrationStatusConstants } from "@/src/constants/instructorConstants";

export const InstructorRegistrationVerifyRejectSchema = Joi.object({
  instructor_id: Joi.number().integer().required().messages({
    "any.required": "Instructor ID is required",
    "number.base": "Instructor ID must be a number",
  }),
  status: Joi.string()
    .valid(
      instructorRegistrationStatusConstants.APPROVED,
      instructorRegistrationStatusConstants.REJECTED,
    )
    .required()
    .messages({
      "any.only": "Status must be either 'approved' or 'rejected'",
    }),
  rejection_reason: Joi.string()
    .when("status", {
      is: instructorRegistrationStatusConstants.REJECTED,
      then: Joi.required(),
      otherwise: Joi.optional().allow("", null),
    })
    .messages({
      "any.required": "Rejection reason is required when rejecting an account",
    }),
});
