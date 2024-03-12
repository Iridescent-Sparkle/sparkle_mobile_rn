import { Checkbox, Space } from '@fruits-chain/react-native-xiaoshu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import BaseCard from '../recruit-base-card'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title: string
  data: {
    label: string
    key: string
  }[]
}

function MultiSelectCard(props: Props) {
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
              renderIcon={({ activeColor, size, active, onPress, disabled }) => {
                return (
                  <>
                    {
                  active ? <AntDesign suppressHighlighting name="checksquare" size={size} color={activeColor} onPress={onPress} disabled={disabled} /> : <Ionicons suppressHighlighting name="square-outline" size={size} color={activeColor} onPress={onPress} disabled={disabled} />
                }
                  </>
                )
              }}
            />
          ))
        )
      }
      </Space>
    </BaseCard>
  )
}

export default MultiSelectCard
