// Define the allowed values based on your DB Enums
export type UserType = "system" | "instructor" | "student";
export type NotificationType = "info" | "warning" | "error";

// Interface for creating a notification
export interface CreateNotificationDTO {
  receiver_id: number;
  user_type: UserType;
  notification_type: NotificationType;
  message: string;
  is_read?: boolean;
  created_by?: number | null;
}
