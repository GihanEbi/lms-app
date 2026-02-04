export enum AppView {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  ONBOARDING_STEP1 = "ONBOARDING_STEP1",
  ONBOARDING_STEP2 = "ONBOARDING_STEP2",
  ONBOARDING_STEP3 = "ONBOARDING_STEP3",
  AI_INTRO = "AI_INTRO",
  AI_INTERVIEW = "AI_INTERVIEW",
  AI_INSIGHTS = "AI_INSIGHTS",
  DASHBOARD = "DASHBOARD",
}

export interface UserData {
  fullName: string;
  email: string;
  dob: string;
  phone: string;
  education: string;
  institution: string;
  fieldOfStudy: string;
  skills: string[];
  interests: string[];
  goals: string;
  learningStyle: "Visual" | "Auditory" | "Kinesthetic";
  studyTime: "Morning" | "Afternoon" | "Evening" | "Night";
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  aiMatch: number;
  image: string;
}
