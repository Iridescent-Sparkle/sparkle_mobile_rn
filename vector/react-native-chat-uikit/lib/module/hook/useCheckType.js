import * as React from 'react';
import { useGetObjectName } from './useGetObjectName';
const ExpectedType = typeof {};

/**
 * Check whether the object type is as expected.
 *
 * @example
 *
 * ```tsx
 * export function TestComponent({
 *    containerStyle,
 *  }: {
 *    containerStyle?: StyleProp<ViewStyle> | undefined;
 *  }) {
 *    const { getStyleSize } = useGetStyleProps();
 *    const size = getStyleSize(containerStyle);
 *    const { checkType } = useCheckType();
 *    checkType(size.width, 'string');
 *    return (
 *      <View
 *        style={[
 *          { width: 100, height: 100, backgroundColor: 'red' },
 *          containerStyle,
 *        ]}
 *      >
 *        <Text>{'I am a striking color block.'}</Text>
 *      </View>
 *    );
 *  }
 * ```
 */
export function useCheckType(params) {
  const {
    getObjectName
  } = useGetObjectName();
  const ret = React.useMemo(() => {
    return {
      checkType: (object, expectedType, others) => {
        var _useCheckType$caller;
        if ((params === null || params === void 0 ? void 0 : params.enabled) === false) {
          return;
        }
        const log = `{
          toolName: '${useCheckType.name}',
          callerName: '${(others === null || others === void 0 ? void 0 : others.callerName) ?? (useCheckType === null || useCheckType === void 0 ? void 0 : (_useCheckType$caller = useCheckType.caller) === null || _useCheckType$caller === void 0 ? void 0 : _useCheckType$caller.name)}',
          objectName: '${(others === null || others === void 0 ? void 0 : others.objectName) ?? getObjectName(object)}',
          expectedType: '${expectedType}',
          equalResult: '${typeof object === expectedType}',
        }`;
        if (typeof object !== expectedType) {
          console.warn(log);
        } else {
          console.log(log);
        }
      }
    };
  }, [getObjectName, params === null || params === void 0 ? void 0 : params.enabled]);
  return ret;
}
//# sourceMappingURL=useCheckType.js.map