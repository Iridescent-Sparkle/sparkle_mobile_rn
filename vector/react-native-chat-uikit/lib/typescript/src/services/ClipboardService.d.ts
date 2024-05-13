import type { ClipboardService, ClipboardServiceOption } from './types';
export declare class ClipboardServiceImplement implements ClipboardService {
    option: ClipboardServiceOption;
    constructor(option: ClipboardServiceOption);
    setString(text: string): void;
    getString(): Promise<string>;
}
//# sourceMappingURL=ClipboardService.d.ts.map