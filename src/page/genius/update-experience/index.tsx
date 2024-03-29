import { Button } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from '@/core/components/Form'
import Input from '@/core/components/Slider'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import Switch from '@/core/components/Switch'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'

export default function GeniusUpdateExperience() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <Form.Item name="nickname">
            <Input title="职位" />
          </Form.Item>
          <Form.Item name="nickname">
            <Input title="公司" />
          </Form.Item>
          <Form.Item name="nickname">
            <RangeDatePicker title="起止时间" />
          </Form.Item>
          <Form.Item name="nickname">
            <Switch title="是否在职" />
          </Form.Item>
          <Form.Item name="nickname">
            <TextArea title="工作描述" />
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
