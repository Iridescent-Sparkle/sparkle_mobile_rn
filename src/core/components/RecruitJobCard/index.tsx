import { Badge, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

interface Props {
  type: 'deliver' | 'manage'
  data: JobDetail
}

function RecruitJobCard(props: Props) {
  const { type, data } = props

  const navigation = useNavigation()

  const handleEditJob = () => {
    navigation.dispatch(StackActions.push('PublishJob', {
      jobId: data.id,
    }))
  }

  const handleViewJob = () => {
    navigation.dispatch(StackActions.push('DeliverList', {
      jobId: data.id,
    }))
  }

  const handleManageJob = () => {
    navigation.dispatch(StackActions.push('JobDetail', {
      jobId: data.id,
      type,
    }))
  }

  return (
    <View style={styles.container}>
      <Space direction="horizontal" style={styles.header}>
        <Pressable style={styles.left} onPress={handleManageJob}>
          <FastImage
            style={styles.logo}
            source={{
              uri: data.company?.companyAvatar || `${IMAGE_PREFIX}/stars.png`,
            }}
          />
          <Space gap={pxToDp(20)}>
            <Text style={styles.title}>{data.jobName}</Text>
            <Text style={styles.company}>{data.company?.companyName}</Text>
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
        </Pressable>
        {
          type === 'deliver'
            ? <MaterialIcons name="arrow-forward-ios" size={pxToDp(32)} color="black" />
            : (
              <Space direction="vertical" gap={pxToDp(70)}>
                <FontAwesome6 name="pen-to-square" size={pxToDp(30)} color={themeColor.primary} onPress={handleEditJob} />
                {/* <Badge dot offset={[5, -2]}> */}
                <Feather name="list" size={pxToDp(32)} color={themeColor.primary} onPress={handleViewJob} />
                {/* </Badge> */}
              </Space>
              )
        }
      </Space>
    </View>
  )
}

const styles = create({
  container: {
    padding: 16,
    marginBottom: 32,
    borderBottomWidth: 2,
    borderColor: '#F0F1F1',
  },
  left: {
    flexDirection: 'row',
    gap: 32,
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
