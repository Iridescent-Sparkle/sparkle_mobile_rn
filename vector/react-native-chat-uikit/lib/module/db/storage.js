import AsyncStorage from '@react-native-async-storage/async-storage';
export class AsyncStorageBasic {
  constructor(params) {
    this.prefix = `@${params.appKey}`;
  }
  destructor() {}
  setCurrentId(useId) {
    this.useId = useId;
  }
  async setData(params) {
    try {
      await AsyncStorage.setItem(params.key, params.value);
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
      const value = await AsyncStorage.getItem(params.key);
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
export class ConversationStorage extends AsyncStorageBasic {
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
export class ContactStorage extends AsyncStorageBasic {
  constructor(params) {
    super(params);
  }
  destructor() {
    super.destructor();
  }
}
//# sourceMappingURL=storage.js.map