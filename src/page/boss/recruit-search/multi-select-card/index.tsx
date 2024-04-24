import { Checkbox, Space } from '@fruits-chain/react-native-xiaoshu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Fragment } from 'react'
import BaseCard from '../recruit-base-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import Form from '@/core/components/Form'

interface Props {
  title: string
  data: {
    label: string
    value: string
  }[]
  name: string
}

function MultiSelectCard(props: Props) {
  const { title, data, name } = props

  return (
    <BaseCard title={title}>
      <Form.Item name={name}>
        <MultiSelectCheckBox data={data}></MultiSelectCheckBox>
      </Form.Item>
    </BaseCard>
  )
}
interface MultiSelectCheckBoxProps {
  data: {
    label: string
    value: string
  }[]
  value?: any
  onChange?: (value: any) => void
}
function MultiSelectCheckBox(props: MultiSelectCheckBoxProps) {
  const { data, value = [], onChange } = props

  return (
    <Space>
      {
        !!data.length && (
          data.map(item => (
            <Checkbox
              value={value.includes(item.value)}
              key={item.value}
              label={item.label}
              activeColor={themeColor.primary}
              renderIcon={({ activeColor, size, active, onPress, disabled }) => {
                return (
                  <Fragment>
                    {
                  active ? <AntDesign suppressHighlighting name="checksquare" size={size} color={activeColor} onPress={onPress} disabled={disabled} /> : <Ionicons suppressHighlighting name="square-outline" size={size} color={activeColor} onPress={onPress} disabled={disabled} />
                }
                  </Fragment>
                )
              }}
              onChange={() => onChange?.([...value, item.value])}
            />
          ))
        )
      }
    </Space>
  )
}
export default MultiSelectCard
