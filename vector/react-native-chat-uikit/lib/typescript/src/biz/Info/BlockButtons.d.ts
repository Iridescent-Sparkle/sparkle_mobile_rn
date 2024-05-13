import * as React from 'react';
import { BlockButtonProps } from '../../ui/Button';
/**
 * Block Buttons Component properties.
 *
 * There are three built-in buttons, including send message button, send audio button, and send video button.
 */
export type BlockButtonsProps = {
    /**
     * Whether to display the audio call button.
     */
    hasAudioCall?: boolean;
    /**
     * Whether to display the send message button.
     */
    hasSendMessage?: boolean;
    /**
     * Whether to display the video call button.
     */
    hasVideoCall?: boolean;
    /**
     * Send message button callback.
     */
    onSendMessage?: () => void;
    /**
     * Audio call button callback.
     */
    onAudioCall?: () => void;
    /**
     * Video call button callback.
     */
    onVideoCall?: () => void;
    /**
     * Registrar. Change custom button array component. Implement a custom method, provide a default button array component, and return a new button array component.
     */
    onInitButton?: (initButtons: React.ReactElement<BlockButtonProps>[]) => React.ReactElement<BlockButtonProps>[];
};
export declare const BlockButtons: (props: BlockButtonsProps) => JSX.Element;
//# sourceMappingURL=BlockButtons.d.ts.map