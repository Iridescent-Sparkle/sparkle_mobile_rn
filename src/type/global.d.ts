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
  nickName: string
  avatar?: any
  email: string
  contactIdToB: string
  contactIdToC?: any
  contactPassword: string
  isFrozen: boolean
  isAdmin: boolean
  createTime: string
  updateTime: string
}
