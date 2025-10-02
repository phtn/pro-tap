// Enums for Organization System
enum OrganizationType {
  CORPORATION = 'CORPORATION',
  LLC = 'LLC',
  PARTNERSHIP = 'PARTNERSHIP',
  SOLE_PROPRIETORSHIP = 'SOLE_PROPRIETORSHIP',
  NON_PROFIT = 'NON_PROFIT',
  GOVERNMENT = 'GOVERNMENT',
  STARTUP = 'STARTUP',
  ENTERPRISE = 'ENTERPRISE',
  SMB = 'SMB',
}

enum IndustryType {
  TECHNOLOGY = 'TECHNOLOGY',
  FINANCE = 'FINANCE',
  HEALTHCARE = 'HEALTHCARE',
  EDUCATION = 'EDUCATION',
  RETAIL = 'RETAIL',
  MANUFACTURING = 'MANUFACTURING',
  CONSTRUCTION = 'CONSTRUCTION',
  REAL_ESTATE = 'REAL_ESTATE',
  HOSPITALITY = 'HOSPITALITY',
  TRANSPORTATION = 'TRANSPORTATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  LEGAL = 'LEGAL',
  CONSULTING = 'CONSULTING',
  MARKETING = 'MARKETING',
  OTHER = 'OTHER',
}

enum CompanySize {
  MICRO = 'MICRO', // 1-10
  SMALL = 'SMALL', // 11-50
  MEDIUM = 'MEDIUM', // 51-200
  LARGE = 'LARGE', // 201-1000
  ENTERPRISE = 'ENTERPRISE', // 1000+
  MEGA = 'MEGA', // 10000+
}

enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  TEMPORARY = 'TEMPORARY',
  INTERNSHIP = 'INTERNSHIP',
  FREELANCE = 'FREELANCE',
  APPRENTICE = 'APPRENTICE',
}

enum EmploymentStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
  RESIGNED = 'RESIGNED',
  RETIRED = 'RETIRED',
}

enum WorkLocation {
  ON_SITE = 'ON_SITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

enum SeniorityLevel {
  INTERN = 'INTERN',
  ENTRY_LEVEL = 'ENTRY_LEVEL',
  JUNIOR = 'JUNIOR',
  MID_LEVEL = 'MID_LEVEL',
  SENIOR = 'SENIOR',
  LEAD = 'LEAD',
  STAFF = 'STAFF',
  PRINCIPAL = 'PRINCIPAL',
  MANAGER = 'MANAGER',
  SENIOR_MANAGER = 'SENIOR_MANAGER',
  DIRECTOR = 'DIRECTOR',
  SENIOR_DIRECTOR = 'SENIOR_DIRECTOR',
  VP = 'VP',
  SVP = 'SVP',
  C_LEVEL = 'C_LEVEL',
  FOUNDER = 'FOUNDER',
}

enum LeaveType {
  VACATION = 'VACATION',
  SICK_LEAVE = 'SICK_LEAVE',
  PERSONAL = 'PERSONAL',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  PARENTAL = 'PARENTAL',
  BEREAVEMENT = 'BEREAVEMENT',
  SABBATICAL = 'SABBATICAL',
  UNPAID = 'UNPAID',
  MEDICAL = 'MEDICAL',
  JURY_DUTY = 'JURY_DUTY',
  MILITARY = 'MILITARY',
}

enum LeaveRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

enum PerformanceRating {
  NEEDS_IMPROVEMENT = 'NEEDS_IMPROVEMENT',
  MEETS_EXPECTATIONS = 'MEETS_EXPECTATIONS',
  EXCEEDS_EXPECTATIONS = 'EXCEEDS_EXPECTATIONS',
  OUTSTANDING = 'OUTSTANDING',
  EXCEPTIONAL = 'EXCEPTIONAL',
}

enum BenefitType {
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
  DENTAL_INSURANCE = 'DENTAL_INSURANCE',
  VISION_INSURANCE = 'VISION_INSURANCE',
  LIFE_INSURANCE = 'LIFE_INSURANCE',
  DISABILITY_INSURANCE = 'DISABILITY_INSURANCE',
  RETIREMENT_401K = 'RETIREMENT_401K',
  PENSION = 'PENSION',
  STOCK_OPTIONS = 'STOCK_OPTIONS',
  PTO = 'PTO',
  FLEXIBLE_SCHEDULE = 'FLEXIBLE_SCHEDULE',
  REMOTE_WORK = 'REMOTE_WORK',
  GYM_MEMBERSHIP = 'GYM_MEMBERSHIP',
  EDUCATION_ASSISTANCE = 'EDUCATION_ASSISTANCE',
  COMMUTER_BENEFITS = 'COMMUTER_BENEFITS',
  CHILD_CARE = 'CHILD_CARE',
  MEAL_ALLOWANCE = 'MEAL_ALLOWANCE',
}

enum PayFrequency {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  SEMI_MONTHLY = 'SEMI_MONTHLY',
  MONTHLY = 'MONTHLY',
}

enum PaymentMethod {
  DIRECT_DEPOSIT = 'DIRECT_DEPOSIT',
  CHECK = 'CHECK',
  CASH = 'CASH',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
}

enum AssetType {
  LAPTOP = 'LAPTOP',
  DESKTOP = 'DESKTOP',
  MONITOR = 'MONITOR',
  PHONE = 'PHONE',
  TABLET = 'TABLET',
  VEHICLE = 'VEHICLE',
  ACCESS_CARD = 'ACCESS_CARD',
  KEYS = 'KEYS',
  SOFTWARE_LICENSE = 'SOFTWARE_LICENSE',
  OTHER = 'OTHER',
}

enum AssetStatus {
  ASSIGNED = 'ASSIGNED',
  AVAILABLE = 'AVAILABLE',
  IN_REPAIR = 'IN_REPAIR',
  RETIRED = 'RETIRED',
  LOST = 'LOST',
}

enum DocumentType {
  CONTRACT = 'CONTRACT',
  NDA = 'NDA',
  OFFER_LETTER = 'OFFER_LETTER',
  HANDBOOK = 'HANDBOOK',
  POLICY = 'POLICY',
  PERFORMANCE_REVIEW = 'PERFORMANCE_REVIEW',
  WARNING = 'WARNING',
  TERMINATION = 'TERMINATION',
  CERTIFICATION = 'CERTIFICATION',
  ID_DOCUMENT = 'ID_DOCUMENT',
  TAX_FORM = 'TAX_FORM',
  OTHER = 'OTHER',
}

enum MeetingType {
  ONE_ON_ONE = 'ONE_ON_ONE',
  TEAM = 'TEAM',
  ALL_HANDS = 'ALL_HANDS',
  DEPARTMENT = 'DEPARTMENT',
  CLIENT = 'CLIENT',
  INTERVIEW = 'INTERVIEW',
  TRAINING = 'TRAINING',
  REVIEW = 'REVIEW',
}

enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
  CRITICAL = 'CRITICAL',
}

enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Base interfaces
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

interface Address {
  street: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

interface ContactInfo {
  email: string
  phone: string
  mobilePhone?: string
  fax?: string
  website?: string
}

// Company Core Information
interface CompanyProfile {
  legalName: string
  tradeName?: string
  type: OrganizationType
  industry: IndustryType
  size: CompanySize
  foundedDate: Date
  registrationNumber?: string
  taxId: string
  duns?: string
  description: string
  mission?: string
  vision?: string
  values?: string[]
  logoUrl?: string
  website: string
  socialMedia: {
    platform: string
    url: string
  }[]
}

interface Location extends BaseEntity {
  organizationId: string
  name: string
  type:
    | 'HEADQUARTERS'
    | 'OFFICE'
    | 'BRANCH'
    | 'WAREHOUSE'
    | 'FACTORY'
    | 'RETAIL'
    | 'REMOTE'
  address: Address
  contactInfo: ContactInfo
  timezone: string
  capacity?: number
  isActive: boolean
  amenities?: string[]
  operatingHours?: {
    [key: string]: {
      open: string
      close: string
    }
  }
}

// Department and Team Structure
interface Department extends BaseEntity {
  organizationId: string
  name: string
  code: string
  description?: string
  parentDepartmentId?: string
  headEmployeeId?: string
  budget?: number
  costCenter?: string
  locationId?: string
  employeeCount: number
  isActive: boolean
}

interface Team extends BaseEntity {
  organizationId: string
  departmentId: string
  name: string
  description?: string
  leadEmployeeId?: string
  members: string[]
  objectives?: string[]
  isActive: boolean
}

// Employee Core Information
interface EmployeePersonalInfo {
  firstName: string
  middleName?: string
  lastName: string
  preferredName?: string
  dateOfBirth: Date
  gender?: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY' | 'OTHER'
  maritalStatus?:
    | 'SINGLE'
    | 'MARRIED'
    | 'DIVORCED'
    | 'WIDOWED'
    | 'DOMESTIC_PARTNERSHIP'
  nationality: string
  nationalId?: string
  passportNumber?: string
  drivingLicenseNumber?: string
  profilePhotoUrl?: string
}

interface EmployeeContactInfo extends ContactInfo {
  personalEmail?: string
  address: Address
  emergencyContacts: {
    name: string
    relationship: string
    phone: string
    alternatePhone?: string
    isPrimary: boolean
  }[]
}

interface EmploymentDetails {
  employeeNumber: string
  hireDate: Date
  startDate: Date
  endDate?: Date
  employmentType: EmploymentType
  status: EmploymentStatus
  workLocation: WorkLocation
  locationId?: string
  departmentId: string
  teamId?: string
  jobTitle: string
  seniorityLevel: SeniorityLevel
  reportsToEmployeeId?: string
  probationEndDate?: Date
  isProbation: boolean
  isRemote: boolean
  workSchedule?: {
    [key: string]: {
      startTime: string
      endTime: string
      isWorkingDay: boolean
    }
  }
  weeklyHours: number
}

// Compensation and Benefits
interface Compensation extends BaseEntity {
  employeeId: string
  baseSalary: number
  currency: string
  payFrequency: PayFrequency
  paymentMethod: PaymentMethod
  effectiveDate: Date
  endDate?: Date
  overtimeEligible: boolean
  overtimeRate?: number
  bonusEligible: boolean
  targetBonus?: number
  commissionEligible: boolean
  commissionRate?: number
  equityGrant?: {
    shares: number
    vestingStartDate: Date
    vestingPeriodMonths: number
    cliffMonths: number
  }
}

interface Bonus extends BaseEntity {
  employeeId: string
  type:
    | 'PERFORMANCE'
    | 'SIGN_ON'
    | 'RETENTION'
    | 'REFERRAL'
    | 'ANNUAL'
    | 'SPOT'
    | 'PROJECT'
  amount: number
  currency: string
  reason: string
  approvedBy: string
  approvedDate: Date
  paymentDate: Date
  isPaid: boolean
}

interface Benefit extends BaseEntity {
  employeeId: string
  type: BenefitType
  provider?: string
  policyNumber?: string
  coverage?: string
  premium: number
  employeeContribution: number
  employerContribution: number
  startDate: Date
  endDate?: Date
  dependents?: {
    name: string
    relationship: string
    dateOfBirth: Date
  }[]
  isActive: boolean
}

interface Payroll extends BaseEntity {
  employeeId: string
  periodStartDate: Date
  periodEndDate: Date
  payDate: Date
  grossPay: number
  netPay: number
  currency: string
  regularHours: number
  overtimeHours: number
  earnings: {
    type: string
    amount: number
  }[]
  deductions: {
    type: string
    amount: number
  }[]
  taxes: {
    type: string
    amount: number
  }[]
  isPaid: boolean
  paymentMethod: PaymentMethod
  paymentReference?: string
}

// Time and Attendance
interface TimeEntry extends BaseEntity {
  employeeId: string
  date: Date
  clockIn?: Date
  clockOut?: Date
  breakMinutes: number
  totalHours: number
  overtimeHours: number
  workType: 'REGULAR' | 'OVERTIME' | 'HOLIDAY' | 'WEEKEND'
  locationId?: string
  notes?: string
  approvedBy?: string
  approvedAt?: Date
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

interface LeaveBalance {
  employeeId: string
  leaveType: LeaveType
  totalAllotted: number
  used: number
  pending: number
  available: number
  carryOver: number
  year: number
}

interface LeaveRequest extends BaseEntity {
  employeeId: string
  leaveType: LeaveType
  startDate: Date
  endDate: Date
  totalDays: number
  reason: string
  status: LeaveRequestStatus
  requestedDate: Date
  reviewedBy?: string
  reviewedDate?: Date
  reviewNotes?: string
  attachments?: string[]
}

interface Attendance extends BaseEntity {
  employeeId: string
  date: Date
  status:
    | 'PRESENT'
    | 'ABSENT'
    | 'LATE'
    | 'HALF_DAY'
    | 'ON_LEAVE'
    | 'HOLIDAY'
    | 'WEEKEND'
  checkInTime?: Date
  checkOutTime?: Date
  workHours?: number
  notes?: string
}

// Performance Management
interface PerformanceReview extends BaseEntity {
  employeeId: string
  reviewerId: string
  reviewPeriod: {
    startDate: Date
    endDate: Date
  }
  reviewDate: Date
  type:
    | 'ANNUAL'
    | 'SEMI_ANNUAL'
    | 'QUARTERLY'
    | 'PROBATION'
    | 'PROJECT'
    | 'AD_HOC'
  overallRating: PerformanceRating
  competencies: {
    name: string
    rating: PerformanceRating
    comments?: string
  }[]
  goals: {
    description: string
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
    completionPercentage: number
    rating?: PerformanceRating
  }[]
  strengths: string[]
  areasForImprovement: string[]
  developmentPlan?: string
  employeeComments?: string
  nextReviewDate?: Date
  recommendations?: string
}

interface Goal extends BaseEntity {
  employeeId: string
  title: string
  description: string
  type: 'INDIVIDUAL' | 'TEAM' | 'COMPANY'
  category: 'PERFORMANCE' | 'DEVELOPMENT' | 'SKILL' | 'PROJECT' | 'BEHAVIORAL'
  targetDate: Date
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  progress: number
  milestones: {
    title: string
    dueDate: Date
    isCompleted: boolean
    completedDate?: Date
  }[]
  measurableOutcome?: string
  linkedReviewId?: string
}

interface Feedback extends BaseEntity {
  fromEmployeeId: string
  toEmployeeId: string
  type: '360_DEGREE' | 'PEER' | 'UPWARD' | 'DOWNWARD' | 'SELF'
  category: 'POSITIVE' | 'CONSTRUCTIVE' | 'RECOGNITION'
  content: string
  isAnonymous: boolean
  linkedReviewId?: string
  acknowledgedAt?: Date
}

// Training and Development
interface TrainingProgram extends BaseEntity {
  organizationId: string
  title: string
  description: string
  type:
    | 'ONBOARDING'
    | 'TECHNICAL'
    | 'SOFT_SKILLS'
    | 'COMPLIANCE'
    | 'LEADERSHIP'
    | 'CERTIFICATION'
  provider?: string
  duration: number // in hours
  cost?: number
  capacity?: number
  isRequired: boolean
  departmentIds?: string[]
  prerequisites?: string[]
  certificateUrl?: string
  materialsUrl?: string
}

export interface TrainingEnrollment extends BaseEntity {
  employeeId: string
  programId: string
  enrolledDate: Date
  startDate?: Date
  completionDate?: Date
  status: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
  score?: number
  certificateUrl?: string
  expirationDate?: Date
  notes?: string
}

interface Skill extends BaseEntity {
  name: string
  category: string
  description?: string
}

export interface EmployeeSkill extends BaseEntity {
  employeeId: string
  skillId: string
  proficiencyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  yearsOfExperience: number
  lastUsed?: Date
  certifications?: string[]
  endorsements?: {
    endorsedBy: string
    endorsedDate: Date
  }[]
}

// Recruitment and Onboarding
interface JobPosting extends BaseEntity {
  organizationId: string
  title: string
  departmentId: string
  locationId?: string
  employmentType: EmploymentType
  seniorityLevel: SeniorityLevel
  description: string
  responsibilities: string[]
  requirements: string[]
  preferredQualifications?: string[]
  salaryRange?: {
    min: number
    max: number
    currency: string
  }
  benefits?: string[]
  applicationDeadline?: Date
  postedDate: Date
  closedDate?: Date
  hiringManagerId: string
  status: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ON_HOLD' | 'FILLED'
  isInternal: boolean
  isRemote: boolean
}

interface JobApplication extends BaseEntity {
  jobPostingId: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  resumeUrl: string
  coverLetterUrl?: string
  portfolioUrl?: string
  linkedinUrl?: string
  appliedDate: Date
  source:
    | 'WEBSITE'
    | 'REFERRAL'
    | 'JOB_BOARD'
    | 'RECRUITER'
    | 'LINKEDIN'
    | 'OTHER'
  referredBy?: string
  status:
    | 'NEW'
    | 'SCREENING'
    | 'INTERVIEW'
    | 'OFFER'
    | 'HIRED'
    | 'REJECTED'
    | 'WITHDRAWN'
  currentStage?: string
  interviews: {
    scheduledDate: Date
    interviewerIds: string[]
    type: 'PHONE' | 'VIDEO' | 'IN_PERSON' | 'TECHNICAL' | 'PANEL'
    feedback?: string
    rating?: number
  }[]
  notes?: string
}

interface OnboardingChecklist extends BaseEntity {
  employeeId: string
  tasks: {
    title: string
    description?: string
    assignedTo?: string
    dueDate?: Date
    isCompleted: boolean
    completedDate?: Date
    order: number
  }[]
  startDate: Date
  completionDate?: Date
  progress: number
}

// Assets and Equipment
interface Asset extends BaseEntity {
  organizationId: string
  assetType: AssetType
  name: string
  brand?: string
  model?: string
  serialNumber?: string
  purchaseDate?: Date
  purchasePrice?: number
  warrantyExpiry?: Date
  status: AssetStatus
  assignedToEmployeeId?: string
  assignedDate?: Date
  locationId?: string
  condition?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  notes?: string
}

interface AssetAssignment extends BaseEntity {
  assetId: string
  employeeId: string
  assignedDate: Date
  returnDate?: Date
  condition: string
  notes?: string
  signatureUrl?: string
}

// Documents and Compliance
interface Document extends BaseEntity {
  organizationId: string
  employeeId?: string
  type: DocumentType
  title: string
  description?: string
  fileUrl: string
  uploadedBy: string
  uploadedDate: Date
  expirationDate?: Date
  isSigned: boolean
  signedDate?: Date
  signatureUrl?: string
  isConfidential: boolean
  accessibleTo?: string[]
  version: number
}

interface ComplianceRecord extends BaseEntity {
  employeeId: string
  requirementType: string
  description: string
  dueDate?: Date
  completedDate?: Date
  status: 'PENDING' | 'COMPLETED' | 'OVERDUE' | 'NOT_APPLICABLE'
  certificateUrl?: string
  renewalDate?: Date
  notes?: string
}

// Projects and Tasks
interface Project extends BaseEntity {
  organizationId: string
  name: string
  description: string
  departmentId?: string
  projectManagerId: string
  teamMembers: string[]
  startDate: Date
  endDate?: Date
  budget?: number
  status: ProjectStatus
  priority: TaskPriority
  milestones: {
    name: string
    dueDate: Date
    isCompleted: boolean
    completedDate?: Date
  }[]
  progress: number
  clientName?: string
  attachments?: string[]
}

interface Task extends BaseEntity {
  projectId?: string
  title: string
  description?: string
  assignedToEmployeeId?: string
  assignedByEmployeeId: string
  dueDate?: Date
  priority: TaskPriority
  status: TaskStatus
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
  dependencies?: string[]
  attachments?: string[]
  completedDate?: Date
}

// Communication and Collaboration
interface Announcement extends BaseEntity {
  organizationId: string
  title: string
  content: string
  authorEmployeeId: string
  publishDate: Date
  expiryDate?: Date
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  targetAudience: 'ALL' | 'DEPARTMENT' | 'LOCATION' | 'TEAM' | 'SPECIFIC'
  departmentIds?: string[]
  locationIds?: string[]
  teamIds?: string[]
  employeeIds?: string[]
  isPinned: boolean
  viewCount: number
  attachments?: string[]
}

interface Meeting extends BaseEntity {
  organizationId: string
  title: string
  description?: string
  type: MeetingType
  organizerEmployeeId: string
  participants: {
    employeeId: string
    isRequired: boolean
    status: 'ACCEPTED' | 'DECLINED' | 'TENTATIVE' | 'NO_RESPONSE'
  }[]
  startTime: Date
  endTime: Date
  locationId?: string
  meetingRoom?: string
  isVirtual: boolean
  meetingUrl?: string
  agenda?: string
  minutesUrl?: string
  recordingUrl?: string
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
}

// Policies and Handbooks
interface Policy extends BaseEntity {
  organizationId: string
  title: string
  category: string
  content: string
  effectiveDate: Date
  version: number
  isActive: boolean
  requiresAcknowledgment: boolean
  acknowledgments: {
    employeeId: string
    acknowledgedDate: Date
    ipAddress?: string
  }[]
}

// Employee Relations
interface DisciplinaryAction extends BaseEntity {
  employeeId: string
  type:
    | 'VERBAL_WARNING'
    | 'WRITTEN_WARNING'
    | 'SUSPENSION'
    | 'TERMINATION'
    | 'OTHER'
  reason: string
  description: string
  issuedBy: string
  issuedDate: Date
  effectiveDate?: Date
  expiryDate?: Date
  documentUrls?: string[]
  employeeAcknowledged: boolean
  acknowledgedDate?: Date
  appeal?: {
    submittedDate: Date
    reason: string
    status: 'PENDING' | 'APPROVED' | 'DENIED'
    reviewedBy?: string
    reviewedDate?: Date
    outcome?: string
  }
}

interface Grievance extends BaseEntity {
  employeeId: string
  category:
    | 'HARASSMENT'
    | 'DISCRIMINATION'
    | 'WORKPLACE_SAFETY'
    | 'COMPENSATION'
    | 'WORKLOAD'
    | 'MANAGEMENT'
    | 'OTHER'
  description: string
  submittedDate: Date
  status: 'SUBMITTED' | 'UNDER_INVESTIGATION' | 'RESOLVED' | 'CLOSED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  assignedTo?: string
  investigation?: {
    startDate: Date
    endDate?: Date
    findings?: string
    actionTaken?: string
  }
  resolution?: string
  resolvedDate?: Date
  isConfidential: boolean
}

// Main Employee Schema
export interface Employee extends BaseEntity {
  // Employees
  employees: Employee[]
  totalEmployees: number
  activeEmployees: number

  // Recruitment
  jobPostings: JobPosting[]
  jobApplications: JobApplication[]

  // Training Programs
  trainingPrograms: TrainingProgram[]
  skills: Skill[]

  // Assets
  assets: Asset[]

  // Projects
  projects: Project[]

  // Communication
  announcements: Announcement[]
  meetings: Meeting[]

  // Policies
  policies: Policy[]

  // Financial Information
  fiscalYearEnd: Date
  annualRevenue?: number
  currency: string

  // Organizational Metrics
  metrics: {
    employeeTurnoverRate: number
    averageTenure: number
    headcount: number
    diversityMetrics?: {
      genderDistribution: {
        [key: string]: number
      }
      ageDistribution: {
        [key: string]: number
      }
    }
    departmentDistribution: {
      departmentId: string
      employeeCount: number
      percentage: number
    }[]
  }

  // Benefits Administration
  benefitPlans: {
    type: BenefitType
    planName: string
    provider: string
    description: string
    employerContributionPercentage: number
    eligibilityCriteria: string
    enrollmentPeriod?: {
      startDate: Date
      endDate: Date
    }
    isActive: boolean
  }[]

  // Compliance and Legal
  licenses: {
    type: string
    licenseNumber: string
    issuingAuthority: string
    issueDate: Date
    expirationDate?: Date
    documentUrl?: string
  }[]
  insurancePolicies: {
    type:
      | 'GENERAL_LIABILITY'
      | 'WORKERS_COMP'
      | 'PROPERTY'
      | 'CYBER'
      | 'DIRECTORS_OFFICERS'
      | 'OTHER'
    provider: string
    policyNumber: string
    coverage: number
    premium: number
    startDate: Date
    endDate: Date
    documentUrl?: string
  }[]

  // Organizational Charts
  organizationalChart?: {
    version: number
    effectiveDate: Date
    chartUrl?: string
    nodes: {
      employeeId: string
      level: number
      parentEmployeeId?: string
    }[]
  }

  // Company Culture and Values
  coreValues?: string[]
  employeeEngagement?: {
    lastSurveyDate: Date
    overallScore: number
    participationRate: number
    categories: {
      category: string
      score: number
    }[]
  }

  // Integrations
  integrations: {
    name: string
    type:
      | 'PAYROLL'
      | 'HR'
      | 'TIME_TRACKING'
      | 'BENEFITS'
      | 'ATS'
      | 'LEARNING'
      | 'OTHER'
    provider: string
    apiKey?: string
    isActive: boolean
    lastSyncAt?: Date
    configuration?: {
      [key: string]: string | number | boolean
    }
  }[]

  // Holiday Calendar
  holidays: {
    name: string
    date: Date
    isRecurring: boolean
    applicableLocationIds?: string[]
    isCompanyWide: boolean
  }[]

  // Compensation Bands
  compensationBands: {
    jobTitle: string
    seniorityLevel: SeniorityLevel
    locationId?: string
    minSalary: number
    midSalary: number
    maxSalary: number
    currency: string
    effectiveDate: Date
  }[]

  // Succession Planning
  successionPlans: {
    positionId: string
    criticalRole: boolean
    currentEmployeeId?: string
    potentialSuccessors: {
      employeeId: string
      readinessLevel:
        | 'READY_NOW'
        | 'READY_1_YEAR'
        | 'READY_2_YEARS'
        | 'READY_3_PLUS_YEARS'
      developmentNeeds: string[]
    }[]
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    lastReviewDate: Date
  }[]

  // Budget and Forecasting
  departmentBudgets: {
    departmentId: string
    fiscalYear: number
    allocatedBudget: number
    spentBudget: number
    forecastedSpend: number
    categories: {
      category: string
      allocated: number
      spent: number
    }[]
  }[]

  // Employee Recognition
  recognitionPrograms: {
    name: string
    description: string
    type:
      | 'PEER_TO_PEER'
      | 'MANAGER_TO_EMPLOYEE'
      | 'COMPANY_WIDE'
      | 'MILESTONE'
      | 'PERFORMANCE'
    isActive: boolean
    rewards?: {
      type: 'POINTS' | 'CASH' | 'GIFT_CARD' | 'TIME_OFF' | 'OTHER'
      value?: number
    }
  }[]
  recognitionAwards: {
    programId: string
    recipientEmployeeId: string
    givenBy: string
    reason: string
    awardedDate: Date
    isPublic: boolean
  }[]

  // Wellness Programs
  wellnessPrograms: {
    name: string
    description: string
    type:
      | 'FITNESS'
      | 'MENTAL_HEALTH'
      | 'NUTRITION'
      | 'FINANCIAL'
      | 'SOCIAL'
      | 'OTHER'
    provider?: string
    cost?: number
    isActive: boolean
    participants: {
      employeeId: string
      enrolledDate: Date
      status: 'ACTIVE' | 'COMPLETED' | 'DROPPED'
    }[]
  }[]

  // Diversity and Inclusion
  diversityInitiatives: {
    name: string
    description: string
    goals: string[]
    startDate: Date
    endDate?: Date
    budget?: number
    metricsTracked: string[]
    isActive: boolean
  }[]
  employeeResourceGroups: {
    name: string
    description: string
    focus: string
    leadEmployeeId: string
    members: string[]
    isActive: boolean
  }[]

  // Surveys and Feedback
  surveys: {
    title: string
    type: 'ENGAGEMENT' | 'PULSE' | 'EXIT' | 'ONBOARDING' | '360' | 'CUSTOM'
    description?: string
    questions: {
      question: string
      type: 'MULTIPLE_CHOICE' | 'RATING' | 'TEXT' | 'YES_NO'
      options?: string[]
      isRequired: boolean
    }[]
    targetAudience: 'ALL' | 'DEPARTMENT' | 'LOCATION' | 'TEAM' | 'SPECIFIC'
    targetIds?: string[]
    startDate: Date
    endDate: Date
    isAnonymous: boolean
    responseCount: number
    results?: {
      [key: string]: number | string | object
    }
  }[]

  // Company Events
  events: {
    name: string
    description: string
    type:
      | 'TEAM_BUILDING'
      | 'TOWN_HALL'
      | 'SOCIAL'
      | 'TRAINING'
      | 'CONFERENCE'
      | 'CELEBRATION'
      | 'OTHER'
    startDate: Date
    endDate: Date
    locationId?: string
    isVirtual: boolean
    maxCapacity?: number
    registeredAttendees: {
      employeeId: string
      registeredDate: Date
      status: 'REGISTERED' | 'ATTENDED' | 'NO_SHOW' | 'CANCELLED'
    }[]
    budget?: number
    actualCost?: number
  }[]

  // Contractor and Vendor Management
  contractors: {
    id: string
    name: string
    company?: string
    email: string
    phone: string
    contractType: 'INDEPENDENT_CONTRACTOR' | 'CONSULTING' | 'TEMP_AGENCY'
    startDate: Date
    endDate?: Date
    rate: number
    rateType: 'HOURLY' | 'DAILY' | 'PROJECT' | 'MONTHLY'
    departmentId: string
    managerId: string
    skills: string[]
    isActive: boolean
    contractUrl?: string
  }[]

  vendors: {
    id: string
    name: string
    category: string
    contactPerson: string
    email: string
    phone: string
    address?: Address
    services: string[]
    contractStartDate?: Date
    contractEndDate?: Date
    contractValue?: number
    paymentTerms?: string
    isPreferred: boolean
    rating?: number
  }[]

  // Workspace Management
  workspaces: {
    locationId: string
    type:
      | 'DESK'
      | 'OFFICE'
      | 'MEETING_ROOM'
      | 'PHONE_BOOTH'
      | 'COLLABORATION_SPACE'
      | 'HOT_DESK'
    identifier: string
    floor?: string
    capacity: number
    amenities?: string[]
    assignedToEmployeeId?: string
    isBookable: boolean
    bookings?: {
      employeeId: string
      startTime: Date
      endTime: Date
      purpose?: string
    }[]
  }[]

  // IT and Systems
  systemAccounts: {
    employeeId: string
    system: string
    username: string
    role: string
    permissions: string[]
    createdDate: Date
    lastAccessDate?: Date
    expirationDate?: Date
    isActive: boolean
  }[]

  softwareLicenses: {
    name: string
    vendor: string
    licenseType: 'PER_USER' | 'SITE' | 'ENTERPRISE' | 'CONCURRENT'
    totalLicenses: number
    usedLicenses: number
    cost: number
    billingFrequency: 'MONTHLY' | 'ANNUAL'
    renewalDate?: Date
    purchaseDate: Date
    licenseKey?: string
    assignments: {
      employeeId: string
      assignedDate: Date
    }[]
  }[]

  // Emergency Contacts and Procedures
  emergencyProcedures: {
    type:
      | 'FIRE'
      | 'MEDICAL'
      | 'NATURAL_DISASTER'
      | 'SECURITY'
      | 'EVACUATION'
      | 'OTHER'
    title: string
    description: string
    steps: string[]
    emergencyContacts: {
      name: string
      role: string
      phone: string
      isPrimary: boolean
    }[]
    lastReviewedDate: Date
    documentUrl?: string
  }[]

  // Audit and Compliance Logs
  auditLogs: {
    timestamp: Date
    action: string
    entityType: string
    entityId: string
    performedBy: string
    changes?: {
      field: string
      oldValue?: string | number | boolean
      newValue?: string | number | boolean
    }[]
    ipAddress?: string
  }[]

  // Company Settings
  settings: {
    general: {
      defaultCurrency: string
      defaultTimezone: string
      defaultLanguage: string
      fiscalYearStartMonth: number
      weekStartDay: 'MONDAY' | 'SUNDAY'
    }
    hrPolicies: {
      probationPeriodDays: number
      noticePeriodDays: number
      minVacationDays: number
      maxVacationCarryOver: number
      workingHoursPerWeek: number
      overtimeThreshold: number
    }
    payroll: {
      payFrequency: PayFrequency
      payDayOfMonth?: number
      payDayOfWeek?: string
      autoProcessPayroll: boolean
    }
    security: {
      passwordMinLength: number
      passwordExpiryDays: number
      requireTwoFactor: boolean
      sessionTimeoutMinutes: number
      maxLoginAttempts: number
    }
    notifications: {
      birthdayReminders: boolean
      anniversaryReminders: boolean
      leaveRequestAlerts: boolean
      performanceReviewReminders: boolean
      documentExpirationAlerts: boolean
    }
  }
  // Personal Information
  organizationId: string
  personalInfo: EmployeePersonalInfo
  contactInfo: EmployeeContactInfo

  // Employment Details
  employmentDetails: EmploymentDetails
  workHistory: {
    companyName: string
    jobTitle: string
    startDate: Date
    endDate?: Date
    description?: string
  }[]

  // Reporting Structure
  directReports: string[]
  reportsTo?: string

  // Compensation and Benefits
  compensation: Compensation[]
  currentCompensation?: Compensation
  bonuses: Bonus[]
  benefits: Benefit[]
  payrolls: Payroll[]

  // Time and Attendance
  timeEntries: TimeEntry[]
  leaveBalances: LeaveBalance[]
  leaveRequests: LeaveRequest[]
  attendance: Attendance[]

  // Performance
  performanceReviews: PerformanceReview[]
  goals: Goal[]
  feedbackReceived: Feedback[]
  feedbackGiven: Feedback[]

  certifications: {
    name: string
    issuingOrganization: string
    issueDate: Date
    expirationDate?: Date
    credentialId?: string
    credentialUrl?: string
  }[]

  // Metadata
  isActive: boolean
  exitDate?: Date
  exitReason?: string
  exitInterview?: {
    conductedBy: string
    conductedDate: Date
    feedback: string
    wouldRehire: boolean
  }
}

// Main Organization Schema
export interface Organization extends BaseEntity {
  // Core Information
  profile: CompanyProfile
  headquarters: Address
  contactInfo: ContactInfo

  locations: Location[]
  departments: Department[]
  teams: Team[]

  // Assets
  assignedAssets: AssetAssignment[]

  // Documents
  documents: Document[]
  complianceRecords: ComplianceRecord[]

  // Onboarding
  onboardingChecklist?: OnboardingChecklist

  // Projects and Tasks
  projects: string[]
  tasks: Task[]

  // Employee Relations
  disciplinaryActions: DisciplinaryAction[]
  grievances: Grievance[]

  // Settings and Preferences
  preferences: {
    language: string
    timezone: string
    notificationSettings: {
      email: boolean
      sms: boolean
      push: boolean
    }
    workingHoursDisplay: '12_HOUR' | '24_HOUR'
    dateFormat: string
  }

  // Access and Security
  systemAccess: {
    username: string
    lastLoginAt?: Date
    role: string
    permissions: string[]
    twoFactorEnabled: boolean
    passwordLastChanged?: Date
  }

  // Statistics
  totalYearsOfService: number
  performanceScore?: number
  attendanceScore?: number

  // Metadata
  isActive: boolean
  verifiedAt?: Date
  lastAuditDate?: Date
  nextAuditDate?: Date
  dataRetentionPeriodYears: number
}
