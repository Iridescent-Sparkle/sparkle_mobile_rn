import type { ConversationModel } from '../chat';
export declare class AsyncStorageBasic {
    prefix: string;
    useId: string | undefined;
    constructor(params: {
        appKey: string;
    });
    destructor(): void;
    setCurrentId(useId: string): void;
    setData(params: {
        key: string;
        value: string;
    }): Promise<{
        isOk: boolean;
        error?: any;
    }>;
    getData(params: {
        key: string;
    }): Promise<{
        value?: string;
        error?: any;
    }>;
}
export declare class ConversationStorage extends AsyncStorageBasic {
    constructor(params: {
        appKey: string;
    });
    destructor(): void;
    isFinishedForFetchList(): Promise<boolean | undefined>;
    setFinishedForFetchList(isFinished: boolean): Promise<boolean>;
    isFinishedForDoNotDisturb(): Promise<boolean | undefined>;
    setFinishedForDoNotDisturb(isFinished: boolean): Promise<boolean>;
    setAllConversation(list: ConversationModel[]): Promise<boolean>;
    getAllConversation(): Promise<ConversationModel[]>;
}
export declare class ContactStorage extends AsyncStorageBasic {
    constructor(params: {
        appKey: string;
    });
    destructor(): void;
}
//# sourceMappingURL=storage.d.ts.map