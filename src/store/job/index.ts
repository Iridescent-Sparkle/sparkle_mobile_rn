import { create } from 'zustand'

import { request } from '@/core/api'

interface State {
  jobBonusOptions: {
    label: string
    value: string
  }[]
  jobExperienceOptions: {
    label: string
    value: string
  }[]
  jobEducationOptions: {
    label: string
    value: string
  }[]
  jobLevelOptions: {
    label: string
    value: string
  }[]
  jobCategoryOptions: {
    label: string
    value: string
  }[]
  jobFullTimeOptions: {
    label: string
    value: boolean
  }[]
}

interface Action {
  getJobOptions: () => void
}

export const useJobStore = create<State & Action>(set => ({
  jobBonusOptions: [],
  jobExperienceOptions: [],
  jobEducationOptions: [],
  jobLevelOptions: [],
  jobCategoryOptions: [],
  jobFullTimeOptions: [{
    label: '是',
    value: true,
  }, {
    label: '否',
    value: false,
  }],
  getJobOptions: async () => {
    try {
      const [jobBonusOptions, jobExperienceOptions, jobEducationOptions, jobLevelOptions, jobCategoryOptions] = await Promise.all([
        request.post({
          pageSize: 100,
        }, {
          url: '/boss/bonus/all',
        }),
        request.post({}, {
          url: '/boss/experience/all',
        }),
        request.post({}, {
          url: '/boss/education/all',
        }),
        request.post({}, {
          url: '/boss/level/all',
        }),
        request.post({
          pageSize: 100,
        }, {
          url: '/boss/category/all',
        }),
      ])

      return set(state => ({
        ...state,
        jobBonusOptions: jobBonusOptions.data.data.map((option: { bonusName: string, id: number }) => ({
          label: option.bonusName,
          value: option.id,
        })),
        jobExperienceOptions: jobExperienceOptions.data.map((option: { experienceName: string, id: number }) => ({
          label: option.experienceName,
          value: option.id,
        })),
        jobEducationOptions: jobEducationOptions.data.map((option: { educationName: string, id: number }) => ({
          label: option.educationName,
          value: option.id,
        })),
        jobLevelOptions: jobLevelOptions.data.map((option: { levelName: string, id: number }) => ({
          label: option.levelName,
          value: option.id,
        })),
        jobCategoryOptions: jobCategoryOptions.data.data.map((option: { categoryName: string, id: number }) => ({
          label: option.categoryName,
          value: option.id,
        })),
      }))
    }
    catch (error) {

    }
  },
}
))
