import Joi from "joi";
import {
  systemUserTypes,
  notificationTypes,
} from "@/src/constants/systemConstants"; // Assuming your constants are here

export const createNotificationSchema = Joi.object({
  receiver_id: Joi.number().integer().required(),
  user_type: Joi.string()
    .valid(
      systemUserTypes.SYSTEM,
      systemUserTypes.INSTRUCTOR,
      systemUserTypes.STUDENT,
    )
    .required(),
  notification_type: Joi.string()
    .valid(
      notificationTypes.INFO,
      notificationTypes.WARNING,
      notificationTypes.ERROR,
    )
    .required(),
  message: Joi.string().min(1).required(),
});
