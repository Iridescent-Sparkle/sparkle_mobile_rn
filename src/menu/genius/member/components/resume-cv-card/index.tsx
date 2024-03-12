/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端附件简历卡片
 */
import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

function MemberResumeCvCard() {
  return (
    <BaseCollapseCard title="附件简历" titleLeftExtra={<FontAwesome6 name="file-contract" size={pxToDp(32)} color={themeColor.primary} />}>
      <Card style={styles.card}>
        <Space direction="horizontal" style={styles.header}>
          <Space direction="horizontal" gap={pxToDp(32)}>
            <AntDesign name="pdffile1" size={pxToDp(84)} color="#F75555" />
            <Space gap={pxToDp(20)}>
              <Text style={styles.title}>UI/UX Designer</Text>
              <Text style={styles.size}>825 kb</Text>
            </Space>
          </Space>
          <AntDesign name="close" size={pxToDp(32)} color="#F76564" />
        </Space>
      </Card>
    </BaseCollapseCard>
  )
}

const styles = create({
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

export default MemberResumeCvCard
