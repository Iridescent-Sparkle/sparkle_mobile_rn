import { Button } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from '@/core/components/Form'
import ImageUploader from '@/core/components/ImageUploader'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'

export default function GeniusUpdateSummary() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <ImageUploader></ImageUploader>
          <Form.Item name="nickname">
            <TextArea title="总结" />
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
