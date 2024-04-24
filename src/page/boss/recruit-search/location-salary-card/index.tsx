import { Space } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import Slider from 'react-native-a11y-slider'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { cloneElement } from 'react'
import BaseCard from '../recruit-base-card'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import Input from '@/core/components/Input'
import Form from '@/core/components/Form'

function LocationSalaryCard() {
  return (
    <BaseCard title="位置和薪酬">
      <Space>
        <View style={styles.card}>
          <MaterialIcons name="location-on" size={pxToDp(36)} color="black" />
          <Form.Item name="address">
            <Input placeholder="请输入目标城市"></Input>
          </Form.Item>
        </View>
        <Form.Item name="salary">
          <Slider
            min={1}
            max={100}
            labelStyle={styles.label}
            labelTextStyle={styles.labelText}
            markerColor={themeColor.primary}
            values={[1, 100]}
          />
        </Form.Item>
      </Space>
    </BaseCard>
  )
}

const styles = create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFB',
    borderRadius: 16,
    height: 96,
    paddingHorizontal: 32,
  },
  text: {
    marginLeft: 32,
    fontSize: 32,
    color: themeColor.black65,
    fontWeight: '500',
  },
  unit: {
    justifyContent: 'space-between',
  },
  label: {
    backgroundColor: themeColor.primary,
    borderRadius: 8,

  },
  labelText: {
    color: '#fff',
  },
})

export default LocationSalaryCard
