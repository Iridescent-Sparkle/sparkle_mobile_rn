import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'
import Input from '@/core/components/Input'
import Form from '@/core/components/Form'

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
