import { Button } from '@fruits-chain/react-native-xiaoshu'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import MultiSelect from '@/core/components/MultiSelect'
import SingleSelect from '@/core/components/SingleSelect'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'

export default function PublishJob() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView>
        <Form form={form}>
          <Form.Item name="nickname">
            <TextArea title="工作描述" />
          </Form.Item>
          <Form.Item name="nickname">
            <TextArea title="最低资格" />
          </Form.Item>
          <Form.Item name="nickname">
            <MultiSelect title="福利" options={[]}></MultiSelect>
          </Form.Item>
          <Form.Item name="nickname">
            <MultiSelect title="所需技能" options={[]} />
          </Form.Item>
          <Form.Item name="nickname">
            <SingleSelect title="经验" options={[]}></SingleSelect>
          </Form.Item>
          <Form.Item name="nickname">
            <SingleSelect title="教育" options={[]}></SingleSelect>
          </Form.Item>
          <Form.Item name="nickname">
            <SingleSelect title="工作水平" options={[]}></SingleSelect>
          </Form.Item>
          <Form.Item name="nickname">
            <SingleSelect title="工作类型" options={[]}></SingleSelect>
          </Form.Item>
          <Form.Item name="nickname">
            <Input title="空缺"></Input>
          </Form.Item>
          <Form.Item name="nickname">
            <Input title="网站"></Input>
          </Form.Item>
          <Form.Item name="nickname">
            <TextArea title="关于" />
          </Form.Item>
        </Form>
      </ScrollView>
      <Button style={styles.button}>提交</Button>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',

  },
  button: {
    borderRadius: 24,
  },
})
