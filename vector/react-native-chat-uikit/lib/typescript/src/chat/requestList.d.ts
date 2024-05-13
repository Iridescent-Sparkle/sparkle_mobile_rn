import { ChatConversationType, ChatMultiDeviceEvent } from 'react-native-chat-sdk';
import type { RequestList, RequestListListener } from './requestList.types';
import type { ChatService, ChatServiceListener, ResultCallback } from './types';
import type { NewRequestModel } from './types.ui';
/**
 * Request List Implementation.
 */
export declare class RequestListImpl implements RequestList {
    _client: ChatService;
    _listener?: ChatServiceListener;
    _newRequestList: NewRequestModel[];
    _userList: Map<string, RequestListListener>;
    constructor(client: ChatService);
    init(): void;
    unInit(): void;
    reset(): void;
    addListener(key: string, listener: RequestListListener): void;
    removeListener(key: string): void;
    emitNewRequestListChanged(): void;
    bindOnContactInvited(userId: string): void;
    bindOnFriendRequestAccepted(userId: string): void;
    bindOnFriendRequestDeclined(userId: string): void;
    bindOnConversationEvent(event?: ChatMultiDeviceEvent, convId?: string, _convType?: ChatConversationType): void;
    bindOnContactEvent(event?: ChatMultiDeviceEvent, target?: string, _ext?: string): void;
    getRequestList(params: {
        onResult: ResultCallback<NewRequestModel[]>;
    }): void;
    updateRequest(request: NewRequestModel): void;
    removeRequest(request: NewRequestModel): void;
}
//# sourceMappingURL=requestList.d.ts.map