/// <reference types="react" />
import type AudioRecorderPlayer from 'react-native-audio-recorder-player';
import type { Nullable } from '../types';
import type { FileType, MediaService, MediaServiceOptions, OpenCameraOptions, OpenMediaLibraryOptions, OpenResult, PlayAudioOptions, RecordAudioOptions, SaveFileOptions, VideoProps, VideoThumbnailOptions } from './types';
export declare class MediaServiceImplement implements MediaService {
    option: MediaServiceOptions;
    audioPlayer: AudioRecorderPlayer;
    rootDir: string;
    record?: {
        pos: number;
        path: string;
    };
    constructor(option: MediaServiceOptions);
    protected createRootDir(rootDirName: string, DocumentDir?: string): void;
    getRootDir(): string;
    createDir(subDir: string): Promise<string>;
    deleteDir(subDir: string): Promise<void>;
    isDir(subDir: string): Promise<boolean>;
    isExistedDir(subDir: string): Promise<boolean>;
    isExistedFile(file: string): Promise<boolean>;
    startRecordAudio(options: RecordAudioOptions): Promise<boolean>;
    stopRecordAudio(): Promise<{
        pos: number;
        path: string;
    } | undefined>;
    playAudio(options: PlayAudioOptions): Promise<boolean>;
    stopAudio(): Promise<void>;
    private resultReduction;
    openMediaLibrary(options?: OpenMediaLibraryOptions | undefined): Promise<Nullable<FileType>[]>;
    openCamera(options?: OpenCameraOptions | undefined): Promise<Nullable<FileType>>;
    openDocument(options?: OpenResult | undefined): Promise<Nullable<FileType>>;
    saveFromUrl({ remoteUrl, localPath, }: {
        remoteUrl: string;
        localPath: string;
    }): Promise<string>;
    saveFromLocal({ targetPath, localPath, }: {
        targetPath: string;
        localPath: string;
    }): Promise<string>;
    save(options: SaveFileOptions): Promise<Nullable<string>>;
    private static _hash;
    getVideoComponent<Props = {}>({ source, resizeMode, onLoad, ...props }: VideoProps & Props): JSX.Element;
    getVideoThumbnail(options: VideoThumbnailOptions): Promise<string | undefined>;
}
//# sourceMappingURL=MediaService.d.ts.map