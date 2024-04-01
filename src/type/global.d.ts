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
}

interface JobBonus {
  id: number
  bonusName: string
  bonusDescription: string
  isDelete: boolean
  createTime: string
  updateTime: string
}

interface User {
  id: number
  username: string
  password: string
  nickname: string
  avatar?: any
  email: string
  occupation?: string
  contactIdToB: string
  contactIdToC?: any
  contactPassword: string
  isFrozen: boolean
  isAdmin: boolean
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
