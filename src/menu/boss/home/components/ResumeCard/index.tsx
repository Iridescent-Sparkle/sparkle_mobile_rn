import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

interface Props {
  data: UserProfileList
  showCollectBtn?: boolean
}

function ResumeListCard(props: Props) {
  const { data } = props

  const navigation = useNavigation()

  const handleCardClick = () => {
    navigation.dispatch(StackActions.push('ResumeDetail', {
      profileId: data.id,
    }))
  }
  const totalTime = dayjs(data.experience[data.experience.length - 1].endTime).diff(data.experience[data.experience.length - 1].startTime, 'year') >= 1 ? `${dayjs(data.experience[data.experience.length - 1].endTime).diff(data.experience[data.experience.length - 1].startTime, 'year')}年` : `${dayjs(data.experience[data.experience.length - 1].endTime).diff(data.experience[data.experience.length - 1].startTime, 'month') || 1}月`

  return (
    <Pressable onPress={handleCardClick}>
      <Card style={styles.container}>
        <Space direction="horizontal" style={styles.header}>
          <Space direction="horizontal" gap={pxToDp(32)}>
            <FastImage
              style={styles.logo}
              source={{
                uri: data.user?.avatar || `${IMAGE_PREFIX}/stars.png`,
              }}
            />
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{data.user?.occupation}</Text>
              <Text style={styles.desc} numberOfLines={1}>{data.summary}</Text>
            </View>
          </Space>
        </Space>
        <Space style={styles.body}>
          <Space direction="horizontal">
            <Tag type="ghost" color="#1976D2">
              {totalTime}
              经验
            </Tag>
            <Tag type="ghost" color="#1976D2">{data.address}</Tag>
            <Tag type="ghost" color="#1976D2">{data.eduction?.[data.eduction?.length - 1].school}</Tag>
          </Space>
        </Space>
      </Card>
    </Pressable>
  )
}

const styles = create({
  container: {
    width: '100%',
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
