import * as React from 'react';
import type { MessageApi, MessageInit } from './types';
/**
 * Context of the Message.
 */
export declare const MessageContext: React.Context<MessageApi | undefined>;
/**
 * Properties of the Message context.
 */
type MessageContextProps = React.PropsWithChildren<{
    value: MessageInit;
}>;
/**
 * The Message context's provider.
 */
export declare function MessageContextProvider({ value, children, }: MessageContextProps): JSX.Element;
/**
 * Get the Message context's value.
 * @returns The Message context's value.
 */
export declare function useMessageContext(): MessageApi;
export {};
//# sourceMappingURL=MessageContext.d.ts.map