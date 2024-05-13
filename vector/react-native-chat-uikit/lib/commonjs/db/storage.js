"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationStorage = exports.ContactStorage = exports.AsyncStorageBasic = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AsyncStorageBasic {
  constructor(params) {
    this.prefix = `@${params.appKey}`;
  }
  destructor() {}
  setCurrentId(useId) {
    this.useId = useId;
  }
  async setData(params) {
    try {
      await _asyncStorage.default.setItem(params.key, params.value);
      return {
        isOk: true
      };
    } catch (error) {
      return {
        isOk: false,
        error
      };
    }
  }
  async getData(params) {
    try {
      const value = await _asyncStorage.default.getItem(params.key);
      return {
        value: value === null ? undefined : value
      };
    } catch (error) {
      return {
        error
      };
    }
  }
}
exports.AsyncStorageBasic = AsyncStorageBasic;
class ConversationStorage extends AsyncStorageBasic {
  constructor(params) {
    super(params);
  }
  destructor() {
    super.destructor();
  }
  async isFinishedForFetchList() {
    const ret = await this.getData({
      key: `${this.prefix}/${this.useId}/conv/isFinished`
    });
    return ret ? ret.value === 'true' : undefined;
  }
  async setFinishedForFetchList(isFinished) {
    const ret = await this.setData({
      key: `${this.prefix}/${this.useId}/conv/isFinished`,
      value: isFinished.toString()
    });
    return ret.isOk;
  }
  async isFinishedForDoNotDisturb() {
    const ret = await this.getData({
      key: `${this.prefix}/${this.useId}/conv/doNotDisturb`
    });
    return ret ? ret.value === 'true' : undefined;
  }
  async setFinishedForDoNotDisturb(isFinished) {
    const ret = await this.setData({
      key: `${this.prefix}/${this.useId}/conv/doNotDisturb`,
      value: isFinished.toString()
    });
    return ret.isOk;
  }
  async setAllConversation(list) {
    const data = list.map(item => {
      return {
        id: item.convId,
        doNotDisturb: item.doNotDisturb
      };
    });
    const ret = await this.setData({
      key: `${this.prefix}/${this.useId}/conv/allConversation`,
      value: JSON.stringify(data)
    });
    return ret.isOk;
  }
  async getAllConversation() {
    const ret = await this.getData({
      key: `${this.prefix}/${this.useId}/conv/allConversation`
    });
    if (ret.value) {
      const data = JSON.parse(ret.value);
      return data.map(item => {
        return {
          convId: item.id,
          doNotDisturb: item.doNotDisturb
        };
      });
    }
    return [];
  }
}
exports.ConversationStorage = ConversationStorage;
class ContactStorage extends AsyncStorageBasic {
  constructor(params) {
    super(params);
  }
  destructor() {
    super.destructor();
  }
}
exports.ContactStorage = ContactStorage;
//# sourceMappingURL=storage.js.map