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
  jobBonus: JobBonus[]
}

interface JobBonus {
  id: number
  bonusName: string
  bonusDescription: string
  isDelete: boolean
  createTime: string
  updateTime: string
}
