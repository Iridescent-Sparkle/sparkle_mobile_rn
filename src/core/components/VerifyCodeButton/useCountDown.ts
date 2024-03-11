import {useEffect, useRef} from 'react';
import {useRefState} from '@/core/hooks/useRefState';

interface ICountDownOptions {
  interval?: number;
  onEnd?: () => void;
}
function useCountDown(options?: ICountDownOptions) {
  const {interval = 1000, onEnd} = options ?? {};
  /** 倒数 */
  const [countDown, setCountDown, $countDown] = useRefState<number>(0);
  /** 定时器 */
  const timer = useRef<NodeJS.Timeout | null>();
  const run = (value: number) => {
    setCountDown(value);
    if (!timer.current) {
      timer.current = setInterval(() => {
        const count = $countDown() - interval / 1000;
        setCountDown(count);
        if (count === 0) {
          timer.current && clearInterval(timer.current);
          timer.current = null;
          onEnd?.();
        }
      }, interval);
    }
  };
  useEffect(() => {
    return () => {
      timer.current && clearInterval(timer.current);
      timer.current = null;
    };
  }, []);
  return [countDown, run, $countDown] as any;
}

export default useCountDown;
