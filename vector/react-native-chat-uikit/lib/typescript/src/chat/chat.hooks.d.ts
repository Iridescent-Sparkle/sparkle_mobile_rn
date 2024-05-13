import type { ChatServiceListener } from './types';
/**
 * The life cycle of a listener should be as long as the component declaration and should not be added or deleted frequently. Therefore, it is recommended to use `useMemo` or `useRef` to wrap the listener and reduce dependencies.
 * @param listener The IM service object.
 */
export declare function useChatListener(listener: ChatServiceListener): void;
//# sourceMappingURL=chat.hooks.d.ts.map