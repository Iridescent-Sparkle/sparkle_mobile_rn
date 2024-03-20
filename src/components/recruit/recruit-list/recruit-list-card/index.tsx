import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { StackActions, useNavigation } from '@react-navigation/native'
import { pxToDp } from '../../../../core/styleSheet/index'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import Visible from '@/core/components/Visible'

interface Props {
  handleCollectClick?: () => void
  data: any
  showCollectBtn?: boolean
}

function RecruitListCard(props: Props) {
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
            <Space gap={pxToDp(20)}>
              <Text style={styles.title}>UI/UX Designer</Text>
              <Text style={styles.company}>Google LLC</Text>
            </Space>
          </Space>
          <Visible visible={showCollectBtn}>
            {
              bookmark
                ? <FontAwesome suppressHighlighting name="bookmark-o" size={pxToDp(48)} color={themeColor.primary} onPress={onCollectClick} />
                : <FontAwesome suppressHighlighting name="bookmark" size={pxToDp(48)} color={themeColor.primary} onPress={onCollectClick} />
            }
          </Visible>
        </Space>
        <Space style={styles.body}>
          <Text style={styles.address}>California, United States</Text>
          <Text style={styles.salary}>$10,000 - $25,000 /month</Text>
          <Space direction="horizontal">
            <Tag type="ghost" color="#979797">Full Time</Tag>
            <Tag type="ghost" color="#979797">Onsite</Tag>
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
