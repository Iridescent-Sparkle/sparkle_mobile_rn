import type { SendFileProps, SendImageProps, SendVideoProps } from '../ConversationDetail';
import type { BasicActionsProps } from './types';
export type UseMessageInputExtendActionsProps = BasicActionsProps & {
    /**
     * Conversation ID.
     */
    convId: string;
    /**
     * callback notification of select one picture.
     */
    onSelectOnePicture: (params: {
        onResult: (params: SendImageProps) => void;
        onCancel?: (() => void) | undefined;
        onError?: ((error: any) => void) | undefined;
    }) => void;
    /**
     * callback notification of select one picture from camera.
     */
    onSelectOnePictureFromCamera: (params: {
        onResult: (params: SendImageProps) => void;
        onCancel?: (() => void) | undefined;
        onError?: ((error: any) => void) | undefined;
    }) => void;
    /**
     * callback notification of select one picture result.
     */
    onSelectOnePictureResult: (props: SendImageProps) => void;
    /**
     * callback notification of select one short video.
     */
    onSelectOneShortVideo: (params: {
        convId: string;
        onResult: (params: SendVideoProps) => void;
        onCancel?: (() => void) | undefined;
        onError?: ((error: any) => void) | undefined;
    }) => void;
    /**
     * callback notification of select one short video result.
     */
    onSelectOneShortVideoResult: (props: SendVideoProps) => void;
    /**
     * callback notification of select one file.
     */
    onSelectFile: (params: {
        onResult: (params: SendFileProps) => void;
        onCancel?: (() => void) | undefined;
        onError?: ((error: any) => void) | undefined;
    }) => void;
    /**
     * callback notification of select one file result.
     */
    onSelectFileResult: (props: SendFileProps) => void;
    /**
     * callback notification of select send card.
     *
     * Routing operations are usually required.
     */
    onSelectSendCard: () => void;
};
export declare function useMessageInputExtendActions(props: UseMessageInputExtendActionsProps): {
    onShowMessageInputExtendActions: () => void;
};
//# sourceMappingURL=useMessageInputExtendActions.d.ts.map