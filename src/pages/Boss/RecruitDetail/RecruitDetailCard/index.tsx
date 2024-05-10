import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { Text } from 'react-native'
import dayjs from 'dayjs'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

interface Props {
  data: JobDetail
}
function RecruitDetailCard(props: Props) {
  const { data } = props

  return (
    <Card style={styles.container}>
      <Space style={styles.header}>
        <FastImage
          style={styles.logo}
          source={{
            uri: data.company?.companyAvatar || `${IMAGE_PREFIX}/stars.png`,
          }}
        />
        <Text style={styles.title}>{data.jobName}</Text>
        <Text style={styles.company}>{data.company?.companyName}</Text>
      </Space>
      <Space style={styles.body}>
        <Text style={styles.address}>{data.address}</Text>
        <Text style={styles.salary}>
          {data.minSalary}
          -
          {data.maxSalary}
          k
        </Text>
        <Space direction="horizontal">
          {data.isFullTime
            ? <Tag type="ghost" color="#979797">全职</Tag>
            : <Tag type="ghost" color="#979797">兼职</Tag>}
          {data.isOnsite
            ? <Tag type="ghost" color="#979797">远程</Tag>
            : <Tag type="ghost" color="#979797">线下办公</Tag>}
        </Space>
        <Text style={styles.deadline}>
          {dayjs(data.updateTime).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
      </Space>
    </Card>
  )
}

const styles = create({
  container: {
    padding: 32,
    borderWidth: 4,
    borderColor: '#F0F1F1',
    borderRadius: 48,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#F0F1F1',
    paddingBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: themeColor.black85,
  },
  company: {
    fontSize: 28,
    color: themeColor.primary,
  },
  logo: {
    width: 108,
    height: 108,
    borderRadius: 24,
  },
  body: {
    paddingTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  address: {
    fontSize: 32,
    color: themeColor.black65,
  },
  salary: {
    fontSize: 28,
    color: themeColor.primary,
  },
  deadline: {
    color: themeColor.black65,
    fontSize: 24,
  },
})

export default RecruitDetailCard
