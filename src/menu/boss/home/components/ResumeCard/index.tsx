import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { StackActions, useNavigation } from '@react-navigation/native'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import Visible from '@/core/components/Visible'

interface Props {
  handleCollectClick?: () => void
  data: any
  showCollectBtn?: boolean
}

function ResumeListCard(props: Props) {
  const { data, handleCollectClick, showCollectBtn = true } = props

  const [bookmark, setBookmark] = useState(false)

  const navigation = useNavigation()
  const onCollectClick = () => {
    setBookmark(!bookmark)
    handleCollectClick && handleCollectClick()
  }
  const handleCardClick = () => {
    navigation.dispatch(StackActions.push('JobDetail'))
  }

  return (
    <Pressable onPress={handleCardClick}>
      <Card style={styles.container}>
        <Space direction="horizontal" style={styles.header}>
          <Space direction="horizontal" gap={pxToDp(32)}>
            <FastImage
              style={styles.logo}
              source={{
                uri: `${IMAGE_PREFIX}/stars.png`,
              }}
            />
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>UI/UX Designer</Text>
              <Text style={styles.company}>Google LLC</Text>
            </View>
          </Space>
          <Text style={styles.time}>1小时前在线</Text>
        </Space>
        <Space style={styles.body}>
          <Text style={styles.desc} numberOfLines={2}>California, United States,California, United States,California, United States</Text>
          <Space direction="horizontal">
            <Tag type="ghost" color="#1976D2">Web前端</Tag>
            <Tag type="ghost" color="#1976D2">3年经验</Tag>
            <Tag type="ghost" color="#1976D2">门头沟学院</Tag>
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
    fontSize: 24,
    color: themeColor.black85,
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
