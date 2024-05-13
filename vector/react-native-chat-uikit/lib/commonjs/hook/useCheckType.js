"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckType = useCheckType;
var React = _interopRequireWildcard(require("react"));
var _useGetObjectName = require("./useGetObjectName");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function useCheckType(params) {
  const {
    getObjectName
  } = (0, _useGetObjectName.useGetObjectName)();
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