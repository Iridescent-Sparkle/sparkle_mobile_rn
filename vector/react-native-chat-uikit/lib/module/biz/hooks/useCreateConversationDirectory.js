import { Services } from '../../services';

/**
 * Create conversation directory hook.
 */
export function useCreateConversationDirectory() {
  const createDirectoryIfNotExisted = async convId => {
    const ret = await Services.dcs.isExistedConversationDir(convId);
    if (ret === true) {
      return;
    }
    Services.dcs.createConversationDir(convId);
  };
  return {
    createDirectoryIfNotExisted
  };
}
//# sourceMappingURL=useCreateConversationDirectory.js.map