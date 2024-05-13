import * as React from 'react';
import { useLifecycle } from '../hook';
import { useDispatchContext } from './dispatch';

/**
 * Use dispatch listener.
 */
export function useDispatchListener(key, cb) {
  const {
    addListener,
    removeListener
  } = useDispatchContext();
  useLifecycle(React.useCallback(state => {
    if (state === 'load') {
      addListener(key, cb);
    } else if (state === 'unload') {
      removeListener(key, cb);
    }
  }, [addListener, cb, key, removeListener]), useDispatchListener.name, false);
}
//# sourceMappingURL=dispatch.hooks.js.map