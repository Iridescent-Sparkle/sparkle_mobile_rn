import type { LocalStorageService } from './types';
export declare class LocalStorageServiceImplement implements LocalStorageService {
    getAllKeys(): Promise<readonly string[]>;
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}
//# sourceMappingURL=LocalStorageService.d.ts.map