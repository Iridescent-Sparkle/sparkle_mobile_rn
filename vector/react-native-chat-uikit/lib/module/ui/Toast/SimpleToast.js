import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Queue, timeoutTask } from '../../utils';
export function SimpleToast(props) {
  const {
    propsRef,
    timeout = 3000
  } = props;
  const tasks = React.useRef(new Queue()).current;
  const preTask = React.useRef(undefined);
  const curTask = React.useRef(undefined);
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.barrage.onLight[3],
      dark: colors.barrage.onDark[3]
    },
    text: {
      light: colors.neutral[98],
      dark: colors.barrage.onDark[8]
    }
  });
  const [text, setText] = React.useState(undefined);
  const [isShow, setIsShow] = React.useState(false);
  const execTask = () => {
    if (curTask.current === undefined) {
      const task = tasks.dequeue();
      if (task) {
        curTask.current = task;
        execAnimation(() => {
          execTask();
        });
      } else {
        setIsShow(false);
      }
    }
  };
  const execAnimation = onFinished => {
    var _curTask$current, _curTask$current2;
    setIsShow(true);
    setText(((_curTask$current = curTask.current) === null || _curTask$current === void 0 ? void 0 : _curTask$current.message) ?? '');
    timeoutTask(((_curTask$current2 = curTask.current) === null || _curTask$current2 === void 0 ? void 0 : _curTask$current2.timeout) ?? timeout, () => {
      preTask.current = curTask.current;
      curTask.current = undefined;
      onFinished === null || onFinished === void 0 ? void 0 : onFinished();
    });
  };
  if (propsRef.current) {
    propsRef.current.show = task => {
      tasks.enqueue(task);
      execTask();
    };
  }
  return /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, {
      justifyContent: 'center',
      alignItems: 'center',
      top: '70%',
      display: isShow === true ? 'flex' : 'none'
    }],
    pointerEvents: 'none'
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: getColor('bg')
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      maxWidth: '50%',
      color: getColor('text'),
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 18
    }
  }, text)));
}
//# sourceMappingURL=SimpleToast.js.map