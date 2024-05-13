export class TranslateImpl {
  tr(key) {
    const r = this.map.get(key);
    if (r) {
      if (typeof r === 'string') {
        return r;
      } else {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return r(...args);
      }
    }
    return key;
  }
  currentLanguage() {
    return this.language;
  }
  constructor(params) {
    this.map = new Map();
    this.language = params.type;
    this.append(params);
  }
  append(params) {
    if (typeof params.assets === 'function') {
      const stringSet = params.assets(params.type);
      const keys = Object.keys(stringSet);
      for (const key of keys) {
        this.map.set(key, stringSet[key]);
      }
    } else {
      const keys = Object.keys(params.assets);
      for (const key of keys) {
        this.map.set(key, params.assets[key]);
      }
    }
  }
}
//# sourceMappingURL=Translate.js.map