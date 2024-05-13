import type { DirCacheService, DirCacheServiceOption } from './types';
export declare class DirCacheServiceImplement implements DirCacheService {
    option: DirCacheServiceOption;
    useId?: string;
    constructor(option: DirCacheServiceOption);
    init(useId: string): void;
    unInit(): void;
    getRootDir(): string;
    getUserDir(): string;
    getMessageDir(): string;
    getConversationDir(convId: string): string;
    getFileDir(convId: string, file: string): string;
    _getUserDir(): string;
    _getMessageDir(): string;
    _getConversationDir(convId: string): string;
    _getFileDir(convId: string, file: string): string;
    isExistedUserDir(): Promise<boolean>;
    isExistedMessageDir(): Promise<boolean>;
    isExistedConversationDir(convId: string): Promise<boolean>;
    isExistedFile(file: string): Promise<boolean>;
    createUserDir(): Promise<string>;
    createMessageDir(): Promise<string>;
    createConversationDir(convId: string): Promise<string>;
    deleteUserDir(): Promise<void>;
    deleteMessageDir(): Promise<void>;
    deleteConversationDir(convId: string): Promise<void>;
}
//# sourceMappingURL=DirCacheService.d.ts.map