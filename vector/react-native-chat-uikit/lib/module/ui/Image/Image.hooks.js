import { ICON_ASSETS } from '../../assets';
export const getIconSource = (name, resolution) => {
  if (typeof name === 'number') {
    return name;
  } else {
    if (name === undefined || name === null) {
      return undefined;
    }
    return ICON_ASSETS[name](resolution ?? '3x');
  }
};
//# sourceMappingURL=Image.hooks.js.map