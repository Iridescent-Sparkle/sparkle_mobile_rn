export declare function autoFocus(): boolean;
/**
 * {@link file:///Users/asterisk/Codes/zuoyu/react-native-chat-library/node_modules/@types/react-native/index.d.ts}
 * #CameraRollStatic.saveImageWithTag
 *
 * On Android, this is a local URI, such as "file:///sdcard/img.png".
 * On iOS, the tag can be one of the following:
 *      local URI
 *      assets-library tag
 *      a tag not matching any of the above, which means the image data will be stored in memory (and consume memory as long as the process is alive)
 *
 * @param localPath local path.
 *
 * @returns local path
 */
export declare class LocalPath {
    static decode(localPath: string): string;
    static encode(localPath: string): string;
    static encode2(localPath: string): string;
    static addFileHeader(localPath: string): string;
    static removeFileHeader(localPath: string): string;
    static playVoice(localPath: string): string;
    static playVideo(localPath: string): string;
    static showImage(localPath: string): string;
    static createImage(localPath: string): string;
    static sendFile(localPath: string): string;
    static sendImage(localPath: string): string;
    static sendVideo(localPath: string): string;
    static sendVoice(localPath: string): string;
}
//# sourceMappingURL=platform.d.ts.map