import { Button } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'

export default function GeniusUpdateProject() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <Form.Item name="nickname">
            <Input title="项目名称" />
          </Form.Item>
          <Form.Item name="nickname">
            <Input title="承担角色" />
          </Form.Item>
          <Form.Item name="nickname">
            <RangeDatePicker title="起止时间" />
          </Form.Item>
          <Form.Item name="nickname">
            <TextArea title="经历描述" />
          </Form.Item>
          <Form.Item name="nickname">
            <TextArea title="项目地址" />
          </Form.Item>
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
})
