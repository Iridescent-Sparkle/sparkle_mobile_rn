import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ResumeCardHeader from '../ResumeCardHeader'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'
import { useUserStore } from '@/store/user'

interface Props {
  data: UserProfileList
}
function ResumeCvCard(props: Props) {
  const { data } = props

  const navigation = useNavigation()

  const handleResumeClick = () => {
    navigation.dispatch(StackActions.push('ResumePreview', data.resume))
  }
  const userStore = useUserStore()
  return (
    <Visible visible={data.resume && userStore.userInfo.contactId.includes(data.user?.profileId)}>
      <View style={styles.container}>
        <ResumeCardHeader title="附件简历" />
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
      </View>
    </Visible>
  )
}

const styles = create({
  container: {
    borderBottomWidth: 4,
    paddingBottom: 24,
    borderBottomColor: '#F2F2F2',
  },
  card: {
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

export default ResumeCvCard
