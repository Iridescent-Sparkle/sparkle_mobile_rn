import { Checkbox, Space } from '@fruits-chain/react-native-xiaoshu'
import BaseCard from '../RecruitBaseCard'
import Form from '@/core/components/Form'
import { themeColor } from '@/core/styleSheet/themeColor'

interface SingleSelectCheckBoxProps {
  data: {
    label: string
    value: string | number | boolean
  }[]
  value?: any
  onChange?: (value: any) => void
}
function SingleSelectCheckBox(props: SingleSelectCheckBoxProps) {
  const { data, value, onChange } = props

  return (
    <Space>
      {
        !!data.length && (
          data.map(item => (
            <Checkbox
              value={value === item.value}
              key={item.value}
              label={item.label}
              activeColor={themeColor.primary}
              onChange={() => onChange?.(item.value)}
            />
          ))
        )
      }
    </Space>
  )
}
interface Props {
  title: string
  data: {
    label: string
    value: string
  }[]
  name: string
}

function SingleSelectCard(props: Props) {
  const { title, data, name } = props

  return (
    <BaseCard title={title}>
      <Form.Item name={name}>
        <SingleSelectCheckBox data={data}></SingleSelectCheckBox>
      </Form.Item>
    </BaseCard>
  )
}

export default SingleSelectCard
