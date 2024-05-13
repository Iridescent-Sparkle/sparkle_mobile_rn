export declare const imageExtRegex: RegExp;
export declare const audioExtRegex: RegExp;
export declare const videoExtRegex: RegExp;
export declare const getFileType: (extOrType: string) => "video" | "file" | "audio" | "image";
export declare function getFileExtension(filePath: string): string;
export declare function getFileDirectory(filePath: string): string;
export declare function generateFileName(fileName: string, extension: string): string;
export declare function passwordRuleCheck(): boolean;
export declare function idRuleCheck(): boolean;
export declare function urlIsValid(url?: string): boolean;
export declare function pathIsInvalid(url?: string): boolean;
//# sourceMappingURL=file.d.ts.map