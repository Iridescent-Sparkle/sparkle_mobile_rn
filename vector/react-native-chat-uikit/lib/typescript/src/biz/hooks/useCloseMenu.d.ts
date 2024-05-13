import * as React from 'react';
import type { BottomSheetNameMenuRef } from '../BottomSheetMenu';
export type UseCloseMenuProps = {
    menuRef: React.RefObject<BottomSheetNameMenuRef>;
};
/**
 * use close menu.
 */
export declare function useCloseMenu(props: UseCloseMenuProps): {
    closeMenu: (onFinished?: () => void) => void;
};
//# sourceMappingURL=useCloseMenu.d.ts.map