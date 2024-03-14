import { Button, Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Form from '@/core/components/Form'
import DocumentPicker from '@/core/components/DocumentPicker'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

export default function GeniusUpdateResume() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <Form.Item name="nickname">
            <DocumentPicker title="" />
          </Form.Item>
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
        </Form>
      </View>
      <Button style={styles.button}>提交</Button>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 24,
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
