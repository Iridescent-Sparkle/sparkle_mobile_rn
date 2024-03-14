import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'
import Input from '@/core/components/Input'
import Form from '@/core/components/Form'
import SingleSelect from '@/core/components/SingleSelect'
import MultiSelect from '@/core/components/MultiSelect'
import TextArea from '@/core/components/TextArea'
import Switch from '@/core/components/Switch'
import RangeDatePicker from '@/core/components/RangeDatePicker'

export default function GeniusUpdateProfile() {
  const insets = useSafeAreaInsets()
  const form = Form.useForm()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Form form={form}>
        <Form.Item name="nickname">
          <Input title="昵称" />
        </Form.Item>
        <Form.Item name="nickname">
          <Input title="昵称" />
        </Form.Item>
        <Form.Item name="nickname">
          <SingleSelect title="昵称"options={[]} />
        </Form.Item>
        <Form.Item name="nickname">
          <MultiSelect title="昵称" options={[]} />
        </Form.Item>
        <Form.Item name="nickname">
          <TextArea title="昵称" />
        </Form.Item>
        <Form.Item name="nickname">
          <Switch
            title="昵称"
            onChange={function (value) {

            }}
          />
        </Form.Item>
        <Form.Item name="nickname">
          <RangeDatePicker
            title="昵称"

          />
        </Form.Item>
      </Form>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
})
