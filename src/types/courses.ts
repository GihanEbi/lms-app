import {
  courseLanguageOptions,
  currencyOptions,
  discountTypeOptions,
} from "@/src/constants/courseConstants";


export interface SectionContentItem {
  content_id: string; // Auto-generated UUID
  title: string;
  type: "video" | "reading" | "quiz" | "task";
  video_url?: string;
  video_duration?: number; // in seconds
  description?: string;
  reading_content?: string; // HTML or text
  quiz_id?: number; // Link to future Quiz table
  task_details?: string;
  is_free_preview?: boolean;
}

export interface CouponDTO {
  code: string;
  discount_type: keyof typeof discountTypeOptions; // "PERCENTAGE" | "FIXED"
  discount_value: number;
  max_uses?: number | null;
}

export interface PricingSettingsDTO {
  // Pricing Fields
  is_paid: boolean;
  price?: number | null;
  currency?: keyof typeof currencyOptions | null; // "USD" | "LKR"

  // Settings Fields
  language: keyof typeof courseLanguageOptions; // "English" | "Sinhala" | "Tamil"
  has_certificate: boolean;

  // Coupons Array
  coupons?: CouponDTO[];
}
