import { Text, TextInput } from 'react-native'

if (!Text.defaultProps)
  Text.defaultProps = {}

if (!TextInput.defaultProps)
  TextInput.defaultProps = {}

Text.defaultProps.allowFontScaling = false
TextInput.defaultProps.allowFontScaling = false
