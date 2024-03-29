import { Space } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import Slider from 'react-native-a11y-slider'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BaseCard from '../recruit-base-card'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

function LocationSalaryCard() {
  return (
    <BaseCard title="位置和薪酬">
      <Space>
        <View style={styles.card}>
          <MaterialIcons name="location-on" size={pxToDp(36)} color="black" />
          <Text style={styles.text}>China</Text>
        </View>
        <Slider
          min={1}
          max={100}
          labelStyle={styles.label}
          labelTextStyle={styles.labelText}
          markerColor={themeColor.primary}
          values={[10, 87]}
        />
        <View style={[styles.card, styles.unit]}>
          <Text style={styles.text}>per month</Text>
          <MaterialIcons name="arrow-drop-down" size={pxToDp(48)} color="black" />
        </View>
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
