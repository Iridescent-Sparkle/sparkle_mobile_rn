import { Button } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from '@/core/components/Form'
import ImageUploader from '@/core/components/ImageUploader'
import Input from '@/core/components/Input'
import SingleSelect from '@/core/components/SingleSelect'
import { create } from '@/core/styleSheet'

export default function GeniusUpdateProfile() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <ImageUploader></ImageUploader>
          <Form.Item name="nickname">
            <Input title="昵称" />
          </Form.Item>
          <Form.Item name="nickname">
            <SingleSelect title="职业"options={[]} />
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
