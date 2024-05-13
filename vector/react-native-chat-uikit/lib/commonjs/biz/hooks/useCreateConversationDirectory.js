"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateConversationDirectory = useCreateConversationDirectory;
var _services = require("../../services");
/**
 * Create conversation directory hook.
 */
function useCreateConversationDirectory() {
  const createDirectoryIfNotExisted = async convId => {
    const ret = await _services.Services.dcs.isExistedConversationDir(convId);
    if (ret === true) {
      return;
    }
    _services.Services.dcs.createConversationDir(convId);
  };
  return {
    createDirectoryIfNotExisted
  };
}
//# sourceMappingURL=useCreateConversationDirectory.js.map