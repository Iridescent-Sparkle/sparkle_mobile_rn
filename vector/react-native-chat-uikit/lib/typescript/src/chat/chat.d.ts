import React from 'react';
import type { ChatService, ChatServiceInit } from './types';
/**
 * Context of the IM.
 */
export declare const ChatContext: React.Context<ChatService | undefined>;
/**
 * Properties of the IM context.
 */
type ChatContextProps = React.PropsWithChildren<{
    value: ChatServiceInit;
}>;
/**
 * The IM context's provider.
 *
 * **Note** IM will be initialized here. If other UIKit is integrated at the same time, the parameters initialized first shall prevail.
 *
 * For example: if `chat uikit sdk` and `chat uikit sdk` are integrated at the same time, then the parameter initialized first will prevail.
 *
 * It can only be initialized once. Even if it is initialized multiple times, parameters modified in time will not take effect again. The reason is that `CHAT SDK` uses the native platform.
 */
export declare function ChatContextProvider({ value, children }: ChatContextProps): JSX.Element;
/**
 * Get the IM context's value.
 * @returns The IM context's value.
 */
export declare function useChatContext(): ChatService;
/**
 * Get the built-in single instance IM object.
 * @returns The IM service.
 */
export declare function getChatService(): ChatService;
export {};
//# sourceMappingURL=chat.d.ts.map