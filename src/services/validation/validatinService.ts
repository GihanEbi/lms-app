import Joi, { Schema, ValidationResult } from "joi";

/**
 * Validates a single property against a Joi schema.
 * Useful for "onBlur" field-level validation in forms.
 *
 * @param schema - The full Joi object schema
 * @param name - The key name of the property to validate
 * @param value - The value to check
 * @returns An error message string or null if valid
 */
export function validateProperty<T>(
  schema: Schema<T>,
  name: keyof T & string,
  value: unknown,
): string | null {
  // Extract the specific field rule from the main schema
  const subSchema = schema.extract(name);

  // Validate just that value
  const { error } = subSchema.validate(value);

  // Return the first error message if it exists
  return error ? error.details[0].message : null;
}

/**
 * Validates an entire object against a Joi schema.
 * Useful for "onSubmit" form validation.
 *
 * @param schema - The full Joi object schema
 * @param data - The data object to validate
 * @returns A dictionary of errors { "email": "Invalid email" } or null if valid
 */
export function validateForm<T>(
  schema: Schema<T>,
  data: T,
): Partial<Record<keyof T, string>> | null {
  const options = { abortEarly: false, allowUnknown: true };

  const { error }: ValidationResult<T> = schema.validate(data, options);

  if (!error) return null;

  // Transform Joi array of errors into a simplified object: { fieldName: errorMessage }
  const errors: Partial<Record<keyof T, string>> = {};

  for (const item of error.details) {
    const key = item.path[0] as keyof T;
    // Only set the first error found for a field to avoid clutter
    if (!errors[key]) {
      errors[key] = item.message;
    }
  }

  return errors;
}
