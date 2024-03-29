import { Button, Tag } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from '@/core/components/Form'
import Input from '@/core/components/Slider'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

export default function GeniusUpdateSkill() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <Form.Item name="nickname">
            <Input title="最小值" />
          </Form.Item>
        </Form>
        <View style={styles.card}>
          <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
            New York  New York
          </Tag>
          <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
            New York.
          </Tag>
          <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
            New York
          </Tag>
          <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
            New York.
          </Tag>
        </View>
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 24,
  },
  tag: {
    borderRadius: 60,
    borderWidth: 4,
    height: 64,
    paddingHorizontal: 24,
  },
})
