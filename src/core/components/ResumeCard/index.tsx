import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Visible from '../Visible'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { useJobStore } from '@/store/job'

interface Props {
  data: UserProfileList
  showCollectBtn?: boolean
  from?: 'home'
}

function ResumeListCard(props: Props) {
  const { data, from } = props

  const navigation = useNavigation()

  const jobStore = useJobStore()

  const handleCardClick = () => {
    navigation.dispatch(StackActions.push('ResumeDetail', {
      profileId: data.id,
      status: data.status,
      deliverId: data.deliverId,
      from,
    }))
  }
  const totalTime = dayjs(data.experience[data.experience.length - 1]?.endTime).diff(data.experience[data.experience.length - 1]?.startTime, 'year') >= 1 ? `${dayjs(data.experience[data.experience.length - 1]?.endTime).diff(data.experience[data.experience.length - 1]?.startTime, 'year')}年` : `${dayjs(data.experience[data.experience.length - 1]?.endTime).diff(data.experience[data.experience.length - 1]?.startTime, 'month') || 1}月`

  return (
    <Pressable onPress={handleCardClick}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <FastImage
            style={styles.logo}
            source={{
              uri: data.user?.avatar || `${IMAGE_PREFIX}/stars.png`,
            }}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{data.occupation}</Text>
            <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">{data.summary}</Text>
          </View>
        </View>
        <Space style={styles.body}>
          <Space direction="horizontal">
            <Visible visible={totalTime}>
              <Tag type="ghost" color="#1976D2">
                {totalTime}
                经验
              </Tag>
            </Visible>
            <Visible visible={data.address}>
              <Tag type="ghost" color="#1976D2">{data.address}</Tag>
            </Visible>
            <Visible visible={data.education?.[data.education?.length - 1]?.school}>
              <Tag type="ghost" color="#1976D2">{data.education?.[data.education?.length - 1]?.school}</Tag>
            </Visible>
            <Visible visible={data.education?.[data.education?.length - 1]?.school}>
              <Tag type="ghost" color="#1976D2">
                {
                  jobStore.jobEducationOptions?.find(option => option.value === data.education?.[data.education?.length - 1]?.educationLevel)?.label
                }
              </Tag>
            </Visible>
          </Space>
        </Space>
      </Card>
    </Pressable>
  )
}

const styles = create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 32,
    borderWidth: 4,
    borderColor: '#F0F1F1',
    borderRadius: 32,
  },
  titleWrapper: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#F0F1F1',
    paddingBottom: 16,
  },
  time: {
    marginTop: 12,
    fontSize: 24,
    color: themeColor.black65,
  },
  title: {
    fontSize: 28,
    color: themeColor.black85,
    fontWeight: '700',
  },
  company: {
    fontSize: 34,
    fontWeight: '700',
    color: themeColor.black85,
  },
  logo: {
    width: 108,
    height: 108,
    borderRadius: 24,
    backgroundColor: '#FAFAFA',
  },
  body: {
    paddingTop: 28,
    justifyContent: 'center',
  },
  desc: {
    fontSize: 24,
    color: themeColor.black65,
  },
})

export default ResumeListCard
