export type SouthAfricanCity = 'Johannesburg' | 'Durban' | 'Cape Town';

export type CareType = 'Live-in Nanny' | 'Live-out Nanny' | 'Au Pair' | 'Night Nurse & Newborn' | 'Weekend / Babysitter';

export type UserRole = 'parent' | 'nanny' | 'guest';

export interface VerifiedReference {
  familyInitials: string;
  suburb: string;
  city: SouthAfricanCity;
  childrenAges: string;
  durationMonths: number;
  quote: string;
  verifiedDate: string;
  contactConfirmed: boolean;
}

export interface NannyProfile {
  id: string;
  name: string;
  age: number;
  city: SouthAfricanCity;
  suburb: string;
  careTypes: CareType[];
  experienceYears: number;
  monthlyRateZAR: number;
  hourlyRateZAR: number;
  languages: string[];
  bio: string;
  skills: string[];
  hasPoliceClearance: boolean; // SAPS
  policeClearanceDate?: string;
  hasFirstAid: boolean; // First Aid Level 1/2
  firstAidCertName?: string;
  hasDriversLicense: boolean;
  hasOwnCar: boolean;
  matricComplete: boolean;
  references: VerifiedReference[];
  rating: number;
  reviewCount: number;
  availability: 'Immediate' | '2 Weeks Notice' | 'From Next Month';
  phone: string;
  email: string;
  badge: 'Top Rated' | 'New Arrival' | 'Night Specialist' | 'Au Pair Pro';
  introSummary: string;
}

export interface JobPosting {
  id: string;
  title: string;
  familyDisplayName: string;
  city: SouthAfricanCity;
  suburb: string;
  careType: CareType;
  childrenDetails: string;
  monthlySalaryZAR: number;
  hoursDescription: string;
  startDate: string;
  liveInProvided: boolean;
  requirements: string[];
  description: string;
  postedAt: string;
  applicationsCount: number;
  status: 'Open' | 'Interviewing' | 'Filled';
}

export interface JobApplication {
  id: string;
  jobId: string;
  nannyId: string;
  nannyName: string;
  appliedDate: string;
  coverNote: string;
  status: 'Received' | 'Interview Shortlist' | 'Contact Shared' | 'Closed';
}

export interface InterviewBooking {
  id: string;
  nannyId: string;
  nannyName: string;
  parentName: string;
  date: string;
  time: string;
  interviewType: 'Video Call (Google Meet)' | 'In-Person at Home' | 'In-Person at Coffee Shop';
  locationOrLink: string;
  notes: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderRole: 'parent' | 'nanny';
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: string;
}

export interface SubscriptionState {
  parentPlan: 'none' | 'once_off_5cv' | 'quarterly_unlimited' | 'monthly' | 'quarterly';
  parentExpiresAt?: string;
  unlockedNannyIds?: string[]; // IDs of the nannies whose CV & WhatsApp numbers were unlocked (up to 5 for once_off_5cv)
  directMessageNannyIds?: string[]; // IDs of nannies directly messaged (up to 5 for once_off_5cv)
  nannyPlan: 'none' | 'monthly' | 'quarterly' | 'basic' | 'pro';
  nannyExpiresAt?: string;
}
