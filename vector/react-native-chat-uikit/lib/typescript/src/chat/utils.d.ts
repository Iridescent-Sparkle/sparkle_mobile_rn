import { ChatMessage } from 'react-native-chat-sdk';
import type { UserData } from './types';
import type { NewRequestModel } from './types.ui';
/**
 * Get user info from message.
 */
export declare function userInfoFromMessage(msg?: ChatMessage | undefined | null): UserData | undefined;
/**
 * Set user info to message.
 */
export declare function setUserInfoToMessage(params: {
    msg: ChatMessage;
    user?: UserData;
}): void;
/**
 * Get message snapshot.
 */
export declare function getMessageSnapshot(msg?: ChatMessage): string;
/**
 * Get new request from message.
 */
export declare function getNewRequest(msg?: ChatMessage): NewRequestModel | undefined;
//# sourceMappingURL=utils.d.ts.map