// src/types/instructor.ts

// 1. Weekly Availability Structure (stored as JSON)
export interface WeeklyAvailability {
  day: string; // e.g., "Mon"
  slots: string[]; // e.g., ["morning", "evening"]
}

// 2. Personal Information (Joined Data)
export interface InstructorPersonalInfoDTO {
  id: number;
  code: string;
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  registration_status: string;
  
  highest_degree_certificate_id: number | null;
  degree_certificate_name: string | null; // Joined field
  
  years_of_experience: number | null;
  date_of_birth: string | null; // Dates often come as strings from JSON APIs
  address: string | null;
  profile_picture_url: string | null;
  resume_url: string | null;
  created_at: Date;
}

// 3. Preferences
export interface InstructorPreferencesDTO {
  id: number;
  instructor_id: number;
  teaching_methodology: string | null;
  student_capacity: number | null;
  weekly_availability: WeeklyAvailability[] | null; // Typed JSON
  linkedin_url: string | null;
  portfolio_url: string | null;
}

// 4. Verifications
export interface InstructorVerificationsDTO {
  id: number;
  instructor_id: number;
  status: "pending" | "verified" | "rejected";
  identity_document_urls: string[];
  certification_document_urls: string[];
  professional_license_number: string | null;
  background_check_consent: boolean;
  digital_signature: string;
  rejection_reason: string | null;
}

// 5. Expertise
export interface InstructorExpertiseDTO {
  subject_id: number;
  subject_name: string;
}

// 6. MAIN RESPONSE INTERFACE
export interface GetInstructorByIdResponse {
  personal_information: InstructorPersonalInfoDTO;
  preferences: InstructorPreferencesDTO | null;
  verifications: InstructorVerificationsDTO | null;
  expertise: InstructorExpertiseDTO[];
}