import { Badge, Card, Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Feather from 'react-native-vector-icons/Feather'
import { StackActions, useNavigation } from '@react-navigation/native'
import { pxToDp } from '../../../../../core/styleSheet/index'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {

}

function RecruitJobCard(props: Props) {
  const navigation = useNavigation()

  const handleEditJob = () => {
    navigation.dispatch(StackActions.push('PublishJob'))
  }
  return (
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
            <Tag type="ghost" color="#979797">Full Time</Tag>
          </Space>
        </Space>
        <Space direction="vertical" gap={pxToDp(70)}>
          <FontAwesome6 name="pen-to-square" size={pxToDp(30)} color={themeColor.primary} onPress={handleEditJob} />
          <Badge dot offset={[5, -2]}>
            <Feather name="list" size={pxToDp(32)} color={themeColor.primary} />
          </Badge>
        </Space>
        {/* <MaterialIcons name="arrow-forward-ios" size={pxToDp(32)} color="black" /> */}
      </Space>
    </Card>
  )
}

const styles = create({
  container: {
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
