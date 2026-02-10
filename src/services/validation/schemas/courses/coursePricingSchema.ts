import Joi from "joi";
import {
  courseLanguageOptions,
  currencyOptions,
  discountTypeOptions,
} from "@/src/constants/courseConstants";

// Coupon Item Schema
const couponSchema = Joi.object({
  code: Joi.string().alphanum().min(3).max(50).required().uppercase(),
  discount_type: Joi.string()
    .valid(...Object.values(discountTypeOptions))
    .required(),
  discount_value: Joi.number().positive().required(),
  max_uses: Joi.number().integer().positive().optional().allow(null),
});

// Main Pricing Schema
export const pricingSettingsSchema = Joi.object({
  // 1. Pricing Logic
  is_paid: Joi.boolean().required(),

  currency: Joi.string()
    .valid(...Object.values(currencyOptions))
    .when("is_paid", {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional().allow(null),
    }),

  price: Joi.number()
    .min(0)
    .precision(2)
    .when("is_paid", {
      is: true,
      then: Joi.number().required().min(1).messages({
        "number.min": "Paid courses must have a price greater than 0",
      }),
      otherwise: Joi.optional().allow(0, null),
    }),

  // 2. Course Settings
  language: Joi.string()
    .valid(...Object.values(courseLanguageOptions))
    .required(),

  has_certificate: Joi.boolean().required(),

  // 3. Coupons (Optional Array)
  coupons: Joi.array().items(couponSchema).optional().default([]),
});
