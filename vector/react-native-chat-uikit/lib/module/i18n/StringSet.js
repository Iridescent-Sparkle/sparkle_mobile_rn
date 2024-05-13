import { createStringSetCn } from './StringSet.cn';
import { createStringSetEn } from './StringSet.en';
export function createDefaultStringSet(type) {
  switch (type) {
    case 'en':
      return createStringSetEn();
    case 'zh-Hans':
      return createStringSetCn();
    default:
      return createStringSetEn();
  }
}
//# sourceMappingURL=StringSet.js.map