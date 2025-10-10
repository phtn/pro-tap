// Enums for type safety
enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  FREELANCE = 'FREELANCE',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  APPRENTICESHIP = 'APPRENTICESHIP',
  SEASONAL = 'SEASONAL',
}

enum LocationType {
  ON_SITE = 'ON_SITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

enum EducationDegree {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  ASSOCIATE = 'ASSOCIATE',
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTORATE = 'DOCTORATE',
  MBA = 'MBA',
  CERTIFICATE = 'CERTIFICATE',
  DIPLOMA = 'DIPLOMA',
}

enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

enum ConnectionStatus {
  NONE = 'NONE',
  PENDING_SENT = 'PENDING_SENT',
  PENDING_RECEIVED = 'PENDING_RECEIVED',
  CONNECTED = 'CONNECTED',
  FOLLOWING = 'FOLLOWING',
}

enum PrivacyLevel {
  PUBLIC = 'PUBLIC',
  CONNECTIONS = 'CONNECTIONS',
  PRIVATE = 'PRIVATE',
}

enum PostType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
  POLL = 'POLL',
  DOCUMENT = 'DOCUMENT',
  CELEBRATION = 'CELEBRATION',
}

enum NotificationType {
  CONNECTION_REQUEST = 'CONNECTION_REQUEST',
  CONNECTION_ACCEPTED = 'CONNECTION_ACCEPTED',
  POST_LIKE = 'POST_LIKE',
  POST_COMMENT = 'POST_COMMENT',
  POST_SHARE = 'POST_SHARE',
  PROFILE_VIEW = 'PROFILE_VIEW',
  MESSAGE = 'MESSAGE',
  JOB_ALERT = 'JOB_ALERT',
  ENDORSEMENT = 'ENDORSEMENT',
  MENTION = 'MENTION',
  BIRTHDAY = 'BIRTHDAY',
  WORK_ANNIVERSARY = 'WORK_ANNIVERSARY',
}

// Base interfaces
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

interface Address {
  street?: string
  city: string
  state?: string
  country: string
  postalCode?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

interface Media {
  id: string
  url: string
  type: 'image' | 'video' | 'document'
  thumbnailUrl?: string
  mimeType: string
  size: number
  width?: number
  height?: number
  duration?: number
  altText?: string
}

// Profile related interfaces
interface ProfilePhoto extends BaseEntity {
  url: string
  thumbnailUrl: string
  isDefault: boolean
}

interface CoverPhoto extends BaseEntity {
  url: string
  position?: number
}

interface ContactInfo {
  email: string
  emailVisibility: PrivacyLevel
  phone?: string
  phoneVisibility: PrivacyLevel
  website?: string
  address?: Address
  addressVisibility: PrivacyLevel
  birthday?: Date
  birthdayVisibility: PrivacyLevel
}

interface OpenToWork {
  isOpen: boolean
  jobTitles: string[]
  locations: Address[]
  remotePreference: LocationType[]
  employmentTypes: EmploymentType[]
  startDate?: Date
  visibility: PrivacyLevel
}

interface ProvidingServices {
  isProviding: boolean
  services: string[]
  description?: string
}

// Experience related interfaces
interface WorkExperience extends BaseEntity {
  title: string
  company: string
  companyId?: string
  employmentType: EmploymentType
  locationType: LocationType
  location?: Address
  startDate: Date
  endDate?: Date
  isCurrentPosition: boolean
  description?: string
  skills: string[]
  media: Media[]
}

interface Education extends BaseEntity {
  school: string
  schoolId?: string
  degree: EducationDegree
  fieldOfStudy: string
  startDate: Date
  endDate?: Date
  grade?: string
  activities?: string
  description?: string
  skills: string[]
  media: Media[]
}

interface License extends BaseEntity {
  name: string
  issuingOrganization: string
  issueDate: Date
  expirationDate?: Date
  credentialId?: string
  credentialUrl?: string
  skills: string[]
}

interface Certification extends BaseEntity {
  name: string
  issuingOrganization: string
  issueDate: Date
  expirationDate?: Date
  credentialId?: string
  credentialUrl?: string
  skills: string[]
}

interface VolunteerExperience extends BaseEntity {
  role: string
  organization: string
  cause?: string
  startDate: Date
  endDate?: Date
  isCurrentRole: boolean
  description?: string
}

interface Project extends BaseEntity {
  name: string
  description?: string
  startDate: Date
  endDate?: Date
  isCurrentProject: boolean
  projectUrl?: string
  associatedWith?: string
  skills: string[]
  media: Media[]
  collaborators: string[]
}

interface Publication extends BaseEntity {
  title: string
  publisher: string
  publicationDate: Date
  publicationUrl?: string
  description?: string
  authors: string[]
}

interface Patent extends BaseEntity {
  title: string
  patentOffice: string
  patentNumber: string
  applicationDate: Date
  issueDate?: Date
  patentUrl?: string
  description?: string
  inventors: string[]
}

interface Honor extends BaseEntity {
  title: string
  issuer: string
  issueDate: Date
  description?: string
}

interface Course extends BaseEntity {
  name: string
  number?: string
  associatedWith?: string
}

interface Language {
  name: string
  proficiency:
    | 'ELEMENTARY'
    | 'LIMITED_WORKING'
    | 'PROFESSIONAL_WORKING'
    | 'FULL_PROFESSIONAL'
    | 'NATIVE'
}

// Skills and Endorsements
interface Skill extends BaseEntity {
  name: string
  level?: SkillLevel
  endorsementCount: number
  isPrimary: boolean
}

interface Endorsement extends BaseEntity {
  skillId: string
  endorsedBy: string
  relationship?: string
}

interface Recommendation extends BaseEntity {
  writtenBy: string
  writtenFor: string
  relationship: string
  recommendationType:
    | 'COLLEAGUE'
    | 'MANAGER'
    | 'MANAGED'
    | 'CLIENT'
    | 'TEACHER'
    | 'STUDENT'
  text: string
  featured: boolean
}

// Social features
interface Connection extends BaseEntity {
  userId: string
  connectedUserId: string
  status: ConnectionStatus
  requestMessage?: string
  connectedDate?: Date
}

interface Follow extends BaseEntity {
  followerId: string
  followedId: string
  followedType: 'USER' | 'COMPANY' | 'HASHTAG'
}

interface Post extends BaseEntity {
  authorId: string
  authorType: 'USER' | 'COMPANY'
  type: PostType
  content?: string
  media: Media[]
  hashtags: string[]
  mentions: string[]
  likeCount: number
  commentCount: number
  shareCount: number
  viewCount: number
  visibility: PrivacyLevel
  isPromoted: boolean
  isPinned: boolean
}

interface Comment extends BaseEntity {
  postId: string
  authorId: string
  content: string
  parentCommentId?: string
  likeCount: number
  replyCount: number
}

interface Like extends BaseEntity {
  userId: string
  targetId: string
  targetType: 'POST' | 'COMMENT' | 'ARTICLE'
  reactionType:
    | 'LIKE'
    | 'CELEBRATE'
    | 'SUPPORT'
    | 'LOVE'
    | 'INSIGHTFUL'
    | 'FUNNY'
}

interface Share extends BaseEntity {
  userId: string
  postId: string
  commentary?: string
  visibility: PrivacyLevel
}

// Messaging
interface Conversation extends BaseEntity {
  participantIds: string[]
  lastMessageAt: Date
  isGroup: boolean
  groupName?: string
  groupImage?: string
}

export interface Message extends BaseEntity {
  conversationId: string
  senderId: string
  content?: string
  media: Media[]
  readBy: Array<{
    userId: string
    readAt: Date
  }>
  replyToMessageId?: string
}

// Job and Company features
interface JobApplication extends BaseEntity {
  userId: string
  jobId: string
  status:
    | 'DRAFT'
    | 'SUBMITTED'
    | 'REVIEWED'
    | 'INTERVIEWING'
    | 'OFFERED'
    | 'ACCEPTED'
    | 'REJECTED'
    | 'WITHDRAWN'
  coverLetter?: string
  resume?: Media
  appliedDate: Date
  lastUpdated: Date
}

interface SavedJob extends BaseEntity {
  userId: string
  jobId: string
}

interface CompanyFollow extends BaseEntity {
  userId: string
  companyId: string
}

// Analytics and Activity
interface ProfileView extends BaseEntity {
  viewedUserId: string
  viewerUserId?: string
  isAnonymous: boolean
  viewDuration?: number
}

interface SearchAppearance extends BaseEntity {
  userId: string
  searchQuery: string
  searcherUserId?: string
  appeared: boolean
  clicked: boolean
}

interface ActivityMetrics {
  profileViews: number
  postViews: number
  searchAppearances: number
  connectionGrowth: number
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  date: Date
}

// Notifications
interface Notification extends BaseEntity {
  userId: string
  type: NotificationType
  title: string
  message: string
  relatedEntityId?: string
  relatedEntityType?: string
  isRead: boolean
  actionUrl?: string
  actorId?: string
}

// Settings
interface PrivacySettings {
  profileVisibility: PrivacyLevel
  activityBroadcast: boolean
  readReceipts: boolean
  activeStatus: boolean
  profilePhotoVisibility: PrivacyLevel
  connectionsVisibility: PrivacyLevel
  emailDiscovery: boolean
  phoneDiscovery: boolean
  allowMessagesFromNonConnections: boolean
  showProfileViewers: boolean
}

interface NotificationSettings {
  emailNotifications: {
    [key in NotificationType]: boolean
  }
  pushNotifications: {
    [key in NotificationType]: boolean
  }
  inAppNotifications: {
    [key in NotificationType]: boolean
  }
  digestFrequency: 'REAL_TIME' | 'DAILY' | 'WEEKLY' | 'NEVER'
}

interface AccountSettings {
  language: string
  timezone: string
  twoFactorEnabled: boolean
  loginEmail: string
  verified: boolean
  accountType: 'FREE' | 'PREMIUM' | 'PREMIUM_PLUS' | 'RECRUITER'
  subscriptionEndDate?: Date
}

// Main UserInfo Schema
export interface UserInfo extends BaseEntity {
  // Basic Information
  firstName: string
  lastName: string
  headline: string
  pronouns?: string
  profilePhoto?: ProfilePhoto
  coverPhoto?: CoverPhoto
  about?: string

  // Contact and Location
  contactInfo: ContactInfo
  currentLocation: Address

  // Career Status
  openToWork?: OpenToWork
  providingServices?: ProvidingServices

  // Professional Experience
  workExperience: WorkExperience[]
  education: Education[]
  licenses: License[]
  certifications: Certification[]
  volunteerExperience: VolunteerExperience[]

  // Skills and Endorsements
  skills: Skill[]
  endorsements: Endorsement[]
  recommendationsReceived: Recommendation[]
  recommendationsGiven: Recommendation[]

  // Projects and Achievements
  projects: Project[]
  publications: Publication[]
  patents: Patent[]
  honors: Honor[]
  courses: Course[]
  languages: Language[]

  // Social Network
  connections: Connection[]
  followers: Follow[]
  following: Follow[]
  connectionCount: number
  followerCount: number

  // Content
  posts: Post[]
  articles: Post[]
  comments: Comment[]
  likes: Like[]
  shares: Share[]

  // Messaging
  conversations: Conversation[]

  // Job Search
  jobApplications: JobApplication[]
  savedJobs: SavedJob[]
  companiesFollowing: CompanyFollow[]

  // Analytics
  profileViews: ProfileView[]
  searchAppearances: SearchAppearance[]
  activityMetrics: ActivityMetrics[]

  // Notifications
  notifications: Notification[]
  unreadNotificationCount: number

  // Settings
  privacySettings: PrivacySettings
  notificationSettings: NotificationSettings
  accountSettings: AccountSettings

  // Metadata
  isVerified: boolean
  isInfluencer: boolean
  profileCompletionPercentage: number
  lastActiveAt: Date
  deactivatedAt?: Date
  suspendedAt?: Date
}
