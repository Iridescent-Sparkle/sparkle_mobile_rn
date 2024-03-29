import { Cell } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import type { SliderProps } from 'react-native-a11y-slider'
import A11ySlider from 'react-native-a11y-slider'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'

interface Props extends Omit<SliderProps, 'values'> {
  onChange?: (value: any) => void
  value?: any
}

function Slider(props: Props) {
  const { value, onChange, ...sliderProps } = props

  return (
    <A11ySlider

      onChange={onChange}
      labelStyle={styles.label}
      labelTextStyle={styles.labelText}
      markerColor={themeColor.primary}
      values={value || [1, 100]}
      {...sliderProps}
    />
  )
}

const styles = create({
  fixGroup: {
    height: 88,
    backgroundColor: '#FAFAFA',
    borderWidth: 0,
  },
  input: {
    backgroundColor: '#FAFAFA',
  },
  label: {
    backgroundColor: themeColor.primary,
    borderRadius: 8,

  },
  labelText: {
    color: '#fff',
  },
})
export default Slider
