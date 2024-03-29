import { Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { StackActions, useNavigation } from '@react-navigation/native'
import { pxToDp } from '../../../../core/styleSheet/index'
import CollectButton from '../../collect-button'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import Visible from '@/core/components/Visible'

interface Props {
  data: JobDetail
  handleCollectClick?: () => void
}

function RecruitListCard(props: Props) {
  const { data, handleCollectClick } = props

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
                uri: data.companyAvatar || `${IMAGE_PREFIX}/stars.png`,
              }}
            />
            <Space gap={pxToDp(20)}>
              <Text style={styles.title}>{data.jobName}</Text>
              <Text style={styles.company}>{data.companyName || ''}</Text>
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
            {data.isFullTime
              ? <Tag type="ghost" color="#979797">全职</Tag>
              : <Tag type="ghost" color="#979797">兼职</Tag>}
            {data.isOnsite
              ? <Tag type="ghost" color="#979797">远程</Tag>
              : <Tag type="ghost" color="#979797">线下办公</Tag>}
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
