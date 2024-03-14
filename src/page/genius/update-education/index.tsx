import { Button } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from '@/core/components/Form'
import ImageUploader from '@/core/components/ImageUploader'
import Input from '@/core/components/Input'
import { create } from '@/core/styleSheet'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import TextArea from '@/core/components/TextArea'
import Switch from '@/core/components/Switch'
import SingleSelect from '@/core/components/SingleSelect'

export default function GeniusUpdateEducation() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <Form.Item name="nickname">
            <Input title="学校" />
          </Form.Item>
          <Form.Item name="nickname">
            <Input title="专业" />
          </Form.Item>
          <Form.Item name="nickname">
            <RangeDatePicker title="起止时间" />
          </Form.Item>
          <Form.Item name="nickname">
            <Switch title="是否毕业" />
          </Form.Item>
          <Form.Item name="nickname">
            <Input title="绩点" />
          </Form.Item>
          <Form.Item name="nickname">
            <SingleSelect title="满绩点" options={[]} />
          </Form.Item>
          <Form.Item name="nickname">
            <TextArea title="经历描述" />
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
