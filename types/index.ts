export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type LanguageProficiency = 'Basic' | 'Conversational' | 'Fluent' | 'Native';
export type AvailabilityStatus = 'Available' | 'Open to Opportunities' | 'Not Available';
export type AvailabilityType = 'Full-time' | 'Part-time' | 'Contract';
export type JobStatus = 'active' | 'closed' | 'draft';
export type ApplicationStatus = 'pending' | 'screening' | 'shortlisted' | 'rejected' | 'hired';

export interface Skill {
  name: string;
  level: SkillLevel;
  yearsOfExperience: number;
}

export interface Language {
  name: string;
  proficiency: LanguageProficiency;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  technologies: string[];
  isCurrent: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Availability {
  status: AvailabilityStatus;
  type: AvailabilityType;
  startDate?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
}

export interface ScreeningResult {
  matchScore: number;
  strengths: string[];
  gaps: string[];
  recommendation: 'Strongly Recommend' | 'Recommend' | 'Consider' | 'Not Recommended';
  summary: string;
  skillBreakdown: { skill: string; score: number }[];
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  bio?: string;
  location: string;
  skills: Skill[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  availability: Availability;
  socialLinks: SocialLinks;
  appliedAt: string;
  status: ApplicationStatus;
  jobId: string;
  screening?: ScreeningResult;
  resumeUrl?: string;
  avatarUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  requirements: string[];
  skills: string[];
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  status: JobStatus;
  createdAt: string;
  closingDate?: string;
  applicantsCount: number;
  screenedCount: number;
  shortlistedCount: number;
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  screenedToday: number;
  shortlisted: number;
  avgMatchScore: number;
}
