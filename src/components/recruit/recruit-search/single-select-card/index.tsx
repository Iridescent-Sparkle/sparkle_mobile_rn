import { Checkbox, Space } from '@fruits-chain/react-native-xiaoshu'
import BaseCard from '../recruit-base-card'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title: string
  data: {
    label: string
    key: string
  }[]
}

function SingleSelectCard(props: Props) {
  const { title, data } = props

  return (
    <BaseCard title={title}>
      <Space>
        {
        !!data.length && (
          data.map(item => (
            <Checkbox
              key={item.key}
              label={item.label}
              activeColor={themeColor.primary}
            />
          ))
        )
      }
      </Space>
    </BaseCard>
  )
}

export default SingleSelectCard
