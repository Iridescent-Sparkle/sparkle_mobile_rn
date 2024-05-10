/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端附件简历卡片
 */
import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { Pressable, Text } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Fragment } from 'react'
import BaseCollapseCard from '../BaseCollapseCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  data: UserProfile
  loading: boolean
}
function MemberResumeCvCard(props: Props) {
  const { data, loading } = props

  const navigation = useNavigation()

  const onAdd = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateResume', {
      isEdit: false,
    }))
  }

  const onEdit = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateResume', {
      isEdit: true,
    }))
  }
  const handleResumeClick = () => {
    navigation.dispatch(StackActions.push('ResumePreview', data.resume))
  }
  return (
    <BaseCollapseCard title="附件简历" titleLeftExtra={<FontAwesome6 name="file-contract" size={pxToDp(32)} color={themeColor.primary} />} onAdd={onAdd} onEdit={onEdit} showContent={!!data.resume?.accessUrl} loading={loading}>
      <Fragment>
        {
          !!data.resume?.accessUrl && (
            <Pressable onPress={handleResumeClick}>
              <Card style={styles.card}>
                <Space direction="horizontal" style={styles.header}>
                  <Space direction="horizontal" gap={pxToDp(32)}>
                    <AntDesign name="pdffile1" size={pxToDp(84)} color="#F75555" />
                    <Space gap={pxToDp(20)}>
                      <Text style={styles.title}>{data.resume?.fileName}</Text>
                      <Text style={styles.size}>
                        {data.resume?.fileSize}
                        KB
                      </Text>
                    </Space>
                  </Space>
                </Space>
              </Card>
            </Pressable>
          )
        }
      </Fragment>
    </BaseCollapseCard>
  )
}

const styles = create({
  card: {
    marginTop: 24,
    backgroundColor: '#FFF2F2',
    borderRadius: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: themeColor.black85,
  },
  size: {
    fontSize: 24,
    color: themeColor.black65,
  },
  logo: {
    width: 116,
    height: 116,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: themeColor.black12,
  },
})

export default MemberResumeCvCard
