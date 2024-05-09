declare module 'aliyun-oss-react-native'

interface JobDetail {
  id: number
  userId: number
  jobName: string
  companyName?: any
  companyAvatar?: any
  address: string
  minSalary: string
  maxSalary: string
  isFullTime: boolean
  isOnsite: boolean
  jobDescription: string
  jobRequirements: string
  jobExperienceId: number
  jobEducationId: number
  jobLevelId: number
  jobCategoryId: number
  headCount: number
  website: string
  companyDescription: string
  isFrozen: boolean
  isDelete: boolean
  createTime: string
  updateTime: string
  isCollected: boolean
  jobCollectId?: number
  jobBonus: JobBonus[]
  jobDeliverStatus: 0 | 1 | 2 | 3 | 4
  jobDeliverId?: number
  user: User
  company: Company
}

interface JobBonus {
  id: number
  bonusName: string
  bonusDescription: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface Company {
  user: any[]
  id: number
  companyName: string
  companyAvatar: string
  companyLicense: string
  companyDesc: string
  status: number
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface UserProfile {
  nickname: string
  avatar?: any
  id: number
  occupation: string
  address: string
  phone: string
  email: string
  minSalary: string
  maxSalary: string
  summary: string
  resume: { accessUrl: string, fileName: string, fileSize: number }
  isDelete: boolean
  isHunting: boolean
  createTime: string
  updateTime: string
}

interface UserProfileList {
  id: number
  occupation: string
  address: string
  phone: string
  email: string
  minSalary: string
  maxSalary: string
  summary: string
  resume: Resume
  isDelete: boolean
  createTime: string
  updateTime: string
  user: User
  eduction: Eduction[]
  project: Project[]
  volunteer: Volunteer[]
  experience: Experience[]
  status: number
  deliverId: number
}

interface Experience {
  id: number
  userId: number
  profileId: number
  profession: string
  companyName: string
  startTime: string
  endTime: string
  isWork: boolean
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface Volunteer {
  id: number
  userId: number
  profileId: number
  activityName: string
  role: string
  startTime: string
  endTime: string
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface Project {
  id: number
  userId: number
  profileId: number
  projectName: string
  role: string
  startTime: string
  endTime: string
  website: string
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface Eduction {
  id: number
  userId: number
  profileId: number
  school: string
  profession: string
  startTime: string
  endTime: string
  gpa: number
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface Resume {
  fileName: string
  fileSize: number
  accessUrl: string
}

interface Experience {
  id: number
  userId: number
  profileId: number
  profession: string
  companyName: string
  startTime: string
  endTime: string
  isWork: boolean
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface UserExperience {
  id: number
  userId: number
  profession: string
  companyName: string
  startTime: string
  endTime: string
  isWork: boolean
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}
interface UserEducation {
  id: number
  userId: number
  school: string
  profession: string
  startTime: string
  endTime: string
  gpa: number
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface UserProject {
  id: number
  userId: number
  projectName: string
  role: string
  startTime: string
  endTime: string
  website: string
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface UserVolunteer {
  id: number
  userId: number
  activityName: string
  role: string
  startTime: string
  endTime: string
  description: string
  isDelete: boolean
  createTime: string
  updateTime: string
}
interface IntegralMeal {
  id: number
  integralNum: number
  price: number
  isDefault: boolean
  isFrozen: boolean
  isDelete: boolean
  createTime: string
  updateTime: string
}
interface DeliverListIem {
  id: number
  jobId: number
  userId: number
  status: number
  isDelete: boolean
  createTime: string
  updateTime: string
  user: User
}

interface User {
  id: number
  username: string
  password: string
  nickname: string
  avatar: string
  occupation?: any
  email: string
  contactIdToB: string
  contactIdToC: string
  contactPassword: string
  integral: number
  companyId?: any
  profileId: number
  contactId: any[]
  isFrozen: boolean
  createTime: string
  updateTime: string
  profile: Profile
  company: Company
}

interface Profile {
  id: number
  occupation: string
  address: string
  phone: string
  email: string
  minSalary: string
  maxSalary: string
  summary: string
  resume?: any
  isDelete: boolean
  createTime: string
  updateTime: string
  eduction: any[]
  experience: any[]
  project: any[]
  volunteer: any[]
}
interface IntegralRecord {
  id: number
  userId: number
  integral: number
  type: 'chat' | 'recharge' | 'publish'
  isDelete: boolean
  createTime: string
  updateTime: string
}
