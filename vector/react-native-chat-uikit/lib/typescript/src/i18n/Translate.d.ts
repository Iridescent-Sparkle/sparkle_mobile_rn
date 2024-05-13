import type { CreateStringSet, LanguageCode, StringSet, StringSetValueType } from './types';
export interface Translate {
    tr(key: string, ...args: any[]): string;
}
export declare class TranslateImpl implements Translate {
    map: Map<string, StringSetValueType>;
    language: LanguageCode;
    tr(key: string, ...args: any[]): string;
    currentLanguage(): LanguageCode;
    constructor(params: {
        assets: CreateStringSet | StringSet;
        type: LanguageCode;
    });
    append(params: {
        assets: CreateStringSet | StringSet;
        type: LanguageCode;
    }): void;
}
//# sourceMappingURL=Translate.d.ts.map