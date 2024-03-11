import {Dimensions, Platform, StyleSheet} from 'react-native';

export {styles as s} from './commonStyles';
export {themeColor as c} from './themeColor';

type NamedStyles<T> = StyleSheet.NamedStyles<T>;

/** 传入样式自动转rpx */
export function create<T extends NamedStyles<T> | NamedStyles<any>>(
  styles: T | NamedStyles<T>,
): T {
  return StyleSheet.create(forStyles(styles)) as T;
}

/** 循环样式最外面的 class */
function forStyles(styles: any) {
  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      const classStyles = styles[key];
      styles[key] = rpxStyles(classStyles);
      /** 修复部分Android机型上的文字兼容性问题 */
      if (
        (styles[key].fontSize || styles[key].fontWeight) &&
        Platform.OS == 'android'
      ) {
        styles[key].fontFamily = 'System';
      }
    }
  }
  return styles;
}

// app 只有竖屏模式，所以可以只获取一次屏幕尺寸
export const windowSize = Dimensions.get('window');

// UI 默认给图是 750
const uiWidthPx = 750;

export function pxToDp(uiElementPx: number) {
  return (uiElementPx * windowSize.width) / uiWidthPx;
}

// 字体适配
export const allowFontScaling = Platform.OS !== 'ios';

// 不自动转rpx的
const filterKeys = ['opacity', 'flex', 'zIndex'];

/** 循环样式 */
function rpxStyles(styles: {[x: string]: number}) {
  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      const value = styles[key];
      if (typeof value === 'number') {
        if (!filterKeys.includes(key)) {
          styles[key] = pxToDp(value);
        }
      }
    }
  }
  return styles;
}
