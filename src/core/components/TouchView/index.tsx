import React from 'react';
import type {TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native';
import useClick from '@/core/hooks/useClick';

type Props = TouchableOpacityProps & {
  throttle?: number;
  onPress?: () => void;
};

function TouchView(props: Props) {
  const {throttle = 500, onPress, ...viewProps} = props;

  const handlePressFn = useClick(() => {
    onPress && onPress();
  }, throttle);

  return <TouchableOpacity {...viewProps} onPress={handlePressFn} />;
}

export default TouchView;
