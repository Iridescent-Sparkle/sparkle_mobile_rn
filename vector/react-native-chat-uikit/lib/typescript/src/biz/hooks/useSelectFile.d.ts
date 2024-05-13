import type { SendFileProps, SendImageProps, SendVideoProps } from '../ConversationDetail/types';
export declare function selectOnePicture(params: {
    onResult: (params: SendImageProps) => void;
    onCancel?: () => void;
    onError?: (error: any) => void;
}): void;
export declare function selectOneShortVideo(params: {
    convId: string;
    onResult: (params: SendVideoProps) => void;
    onCancel?: () => void;
    onError?: (error: any) => void;
}): void;
export declare function selectCamera(params: {
    onResult: (params: SendImageProps) => void;
    onCancel?: () => void;
    onError?: (error: any) => void;
}): void;
export declare function selectFile(params: {
    onResult: (params: SendFileProps) => void;
    onCancel?: () => void;
    onError?: (error: any) => void;
}): void;
//# sourceMappingURL=useSelectFile.d.ts.map