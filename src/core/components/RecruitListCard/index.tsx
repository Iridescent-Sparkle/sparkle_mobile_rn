import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { pxToDp } from '@/core/styleSheet/index'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import Visible from '@/core/components/Visible'
import CollectButton from '@/pages/Genius/JobDetail/components/CollectButton'
import { useJobStore } from '@/store/job'

interface Props {
  data: JobDetail
  handleCollectClick?: () => void
}

function RecruitListCard(props: Props) {
  const { data, handleCollectClick } = props
  const jobStore = useJobStore()
  const navigation = useNavigation()

  const handleCardClick = () => {
    navigation.dispatch(StackActions.push('JobDetail', {
      jobId: data.id,
    }))
  }

  return (
    <Pressable onPress={handleCardClick}>
      <Card style={styles.container}>
        <Space direction="horizontal" style={styles.header}>
          <Space direction="horizontal" gap={pxToDp(32)}>
            <FastImage
              style={styles.logo}
              source={{
                uri: data.company?.companyAvatar || `${IMAGE_PREFIX}/stars.png`,
              }}
            />
            <Space gap={pxToDp(20)}>
              <Text style={styles.title}>{data.jobName}</Text>
              <Text style={styles.company}>{data.company?.companyName || ''}</Text>
            </Space>
          </Space>
          <Visible visible={handleCollectClick}>
            <CollectButton handleCollectClick={handleCollectClick} jobDetail={data}></CollectButton>
          </Visible>
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
            <Tag type="ghost" color="#979797">{jobStore.jobExperienceOptions?.find(item => item.value === data.jobExperienceId)?.label}</Tag>
            <Tag type="ghost" color="#979797">{jobStore.jobEducationOptions?.find(item => item.value === data.jobEducationId)?.label}</Tag>
          </Space>
        </Space>
      </Card>
    </Pressable>
  )
}

const styles = create({
  container: {
    width: '100%',
    height: 384,
    padding: 32,
    marginBottom: 32,
    borderWidth: 4,
    borderColor: '#F0F1F1',
    borderRadius: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: themeColor.black65,
  },
  logo: {
    width: 108,
    height: 108,
    borderRadius: 24,
  },
  body: {
    paddingLeft: 140,
    paddingTop: 28,
    justifyContent: 'center',
  },
  address: {
    fontSize: 32,
    color: themeColor.black65,
  },
  salary: {
    fontSize: 28,
    color: themeColor.primary,
  },
})

export default RecruitListCard
