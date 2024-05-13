import * as React from 'react';
import type { TimerTextRef } from '../../ui/Text';
import type { VoiceBarProps, VoiceBarState } from './types';
export declare function useVoiceBar(props: VoiceBarProps): {
    state: VoiceBarState;
    onClickedRecordButton: () => void;
    onClickedClearButton: () => void;
    onClickedSendButton: () => void;
    contentTimerRef: React.MutableRefObject<TimerTextRef>;
    playRipple: boolean;
    onContentTimeChanged: (v: number) => void;
    currentTime: number;
};
//# sourceMappingURL=VoiceBar.hooks.d.ts.map