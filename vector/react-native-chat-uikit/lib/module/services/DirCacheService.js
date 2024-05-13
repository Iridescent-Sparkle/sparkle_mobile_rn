export class DirCacheServiceImplement {
  constructor(option) {
    this.option = option;
  }
  init(useId) {
    this.useId = useId;
  }
  unInit() {
    this.useId = undefined;
  }
  getRootDir() {
    return this.option.media.getRootDir();
  }
  getUserDir() {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.getRootDir()}/${this.useId}`;
  }
  getMessageDir() {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.getRootDir()}/${this.useId}/msg`;
  }
  getConversationDir(convId) {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.getRootDir()}/${this.useId}/msg/${convId}`;
  }
  getFileDir(convId, file) {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.getRootDir()}/${this.useId}/msg/${convId}/${file}`;
  }
  _getUserDir() {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.useId}`;
  }
  _getMessageDir() {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.useId}/msg`;
  }
  _getConversationDir(convId) {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.useId}/msg/${convId}`;
  }
  _getFileDir(convId, file) {
    // if (this.useId === undefined)
    //   throw new Error('Initialize the object first.');
    return `${this.useId}/msg/${convId}/${file}`;
  }
  isExistedUserDir() {
    return this.option.media.isExistedDir(this._getUserDir());
  }
  isExistedMessageDir() {
    return this.option.media.isExistedDir(this._getMessageDir());
  }
  isExistedConversationDir(convId) {
    return this.option.media.isExistedDir(this._getConversationDir(convId));
  }
  isExistedFile(file) {
    return this.option.media.isExistedFile(file);
  }
  createUserDir() {
    return this.option.media.createDir(this._getUserDir());
  }
  createMessageDir() {
    return this.option.media.createDir(this._getMessageDir());
  }
  createConversationDir(convId) {
    return this.option.media.createDir(this._getConversationDir(convId));
  }
  deleteUserDir() {
    return this.option.media.deleteDir(this._getUserDir());
  }
  deleteMessageDir() {
    return this.option.media.deleteDir(this._getMessageDir());
  }
  deleteConversationDir(convId) {
    return this.option.media.deleteDir(this._getConversationDir(convId));
  }
}
//# sourceMappingURL=DirCacheService.js.map