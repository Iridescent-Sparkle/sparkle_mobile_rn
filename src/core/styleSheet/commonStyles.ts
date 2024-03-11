import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type TypeStyle = ViewStyle | TextStyle | ImageStyle

export const styles = {
  border(): TypeStyle {
    return {}
  },
  margin(a: any, b?: any, c?: any, d?: any): TypeStyle {
    if (arguments.length === 1) {
      return {
        marginTop: a,
        marginRight: a,
        marginBottom: a,
        marginLeft: a,
      }
    }
    if (arguments.length === 2) {
      return {
        marginTop: a,
        marginRight: b,
        marginBottom: a,
        marginLeft: b,
      }
    }
    if (arguments.length === 3) {
      return {
        marginTop: a,
        marginRight: b,
        marginBottom: c,
        marginLeft: b,
      }
    }
    return {
      marginTop: a,
      marginRight: b,
      marginBottom: c,
      marginLeft: d,
    }
  },
  padding(a: any, b?: any, c?: any, d?: any): TypeStyle {
    if (arguments.length === 1) {
      return {
        paddingTop: a,
        paddingRight: a,
        paddingBottom: a,
        paddingLeft: a,
      }
    }
    if (arguments.length === 2) {
      return {
        paddingTop: a,
        paddingRight: b,
        paddingBottom: a,
        paddingLeft: b,
      }
    }
    if (arguments.length === 3) {
      return {
        paddingTop: a,
        paddingRight: b,
        paddingBottom: c,
        paddingLeft: b,
      }
    }
    return {
      paddingTop: a,
      paddingRight: b,
      paddingBottom: c,
      paddingLeft: d,
    }
  },
}
