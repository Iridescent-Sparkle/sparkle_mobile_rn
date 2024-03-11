import {useRef} from 'react';

function useClick<T>(fn: Function, time = 500) {
  const promise = useRef<Promise<T>>();

  return async function (...args: any) {
    if (promise.current) {
      return promise.current;
    }

    promise.current = new Promise(async (resolve, reject) => {
      try {
        const result = await fn(...args);
        resolve(result);
      } catch (e) {
        reject(e);
      } finally {
        setTimeout(() => {
          promise.current = undefined;
        }, time);
      }
    });
    return promise.current;
  };
}

export default useClick;
