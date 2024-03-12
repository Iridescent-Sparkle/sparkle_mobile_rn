import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { Text } from 'react-native'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

function RecruitDetailCard() {
  return (
    <Card style={styles.container}>
      <Space style={styles.header}>
        <FastImage
          style={styles.logo}
          source={{
            uri: `${IMAGE_PREFIX}/stars.png`,
          }}
        />
        <Text style={styles.title}>UI/UX Designer</Text>
        <Text style={styles.company}>Google LLC</Text>
      </Space>
      <Space style={styles.body}>
        <Text style={styles.address}>California, United States</Text>
        <Text style={styles.salary}>$10,000 - $25,000 /month</Text>
        <Space direction="horizontal">
          <Tag type="ghost" color="#979797">Full Time</Tag>
          <Tag type="ghost" color="#979797">Onsite</Tag>
        </Space>
        <Text style={styles.deadline}>Posted 10 days ago,ends in 31 Dec. </Text>
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
    color: '#21201F',
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
    color: '#636363',
  },
  salary: {
    fontSize: 28,
    color: themeColor.primary,
  },
  deadline: {
    color: '#616161',
    fontSize: 24,
  },
})

export default RecruitDetailCard
