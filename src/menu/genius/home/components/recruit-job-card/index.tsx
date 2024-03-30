import { Badge, Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Feather from 'react-native-vector-icons/Feather'
import { StackActions, useNavigation } from '@react-navigation/native'
import { pxToDp } from '../../../../../core/styleSheet/index'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  type: 'deliver'
  data: JobDetail
}

function RecruitJobCard(props: Props) {
  const { type, data } = props
  const navigation = useNavigation()

  const handleEditJob = () => {
    navigation.dispatch(StackActions.push('PublishJob'))
  }

  const handleViewJob = () => {
    navigation.dispatch(StackActions.push('DeliverDetail', {
      jobId: data.id,
    }))
  }

  return (
    <Pressable style={styles.container} onPress={handleViewJob}>
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
            <Text style={styles.company}>{data.companyName}</Text>
            <Space direction="horizontal">
              <Tag type="ghost" color="#979797">
                {data.minSalary}
                -
                {data.maxSalary}
                k
              </Tag>
              <Tag type="ghost" color="#979797">{data.address}</Tag>
              {data.isFullTime
                ? <Tag type="ghost" color="#979797">全职</Tag>
                : <Tag type="ghost" color="#979797">兼职</Tag>}
              {data.isOnsite
                ? <Tag type="ghost" color="#979797">远程</Tag>
                : <Tag type="ghost" color="#979797">线下办公</Tag>}
            </Space>
          </Space>
        </Space>
        {
          type === 'deliver'
            ? <MaterialIcons name="arrow-forward-ios" size={pxToDp(32)} color="black" />
            : (
              <Space direction="vertical" gap={pxToDp(70)}>
                <FontAwesome6 name="pen-to-square" size={pxToDp(30)} color={themeColor.primary} onPress={handleEditJob} />
                <Badge dot offset={[5, -2]}>
                  <Feather name="list" size={pxToDp(32)} color={themeColor.primary} />
                </Badge>
              </Space>
              )
        }
      </Space>
    </Pressable>
  )
}

const styles = create({
  container: {
    padding: 16,
    marginBottom: 32,
    borderBottomWidth: 2,
    borderColor: '#F0F1F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
})

export default RecruitJobCard
