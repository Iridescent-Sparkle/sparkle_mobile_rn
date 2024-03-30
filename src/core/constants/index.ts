import { themeColor } from '../styleSheet/themeColor'

export const IMAGE_PREFIX = 'https://sparkle-cdn.oss-cn-chengdu.aliyuncs.com/sparkle-mobile'
// status:0 未投递 1 已投递 2 已查看 3 已通过 4 已拒绝
export const JOB_DELIVER_STATUS = {
  0: {
    label: '投递',
    desc: '未投递',
    bgColor: themeColor.primary,
    color: '#ffffff',
  },
  1: {
    label: '请等待...',
    desc: '已投递，等待查看',
    bgColor: '#EDF4FF',
    color: '#246BFD',
  },
  2: {
    label: '请等待...',
    desc: '已查看',
    bgColor: '#FFFBED',
    color: '#FBCD18',
  },
  3: {
    label: '发送消息',
    desc: '简历通过',
    bgColor: '#F3F9F2',
    color: '#10BF78',
  },
  4: {
    label: '查看其他职位信息',
    desc: '不合适',
    bgColor: '#FFF2F2',
    color: '#F86060',
  },
}
