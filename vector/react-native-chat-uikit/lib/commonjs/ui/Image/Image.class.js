"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassImage = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class ClassImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = /*#__PURE__*/React.createRef();
    this.state = {
      _source: props.source
    };
  }
  render() {
    const {
      onError,
      failedSource,
      style,
      source,
      ...others
    } = this.props;
    source; // !!! ignore
    return /*#__PURE__*/React.createElement(_reactNative.Image, _extends({
      ref: this.ref,
      style: [style],
      source: this.state._source,
      onError: event => {
        if (onError) {
          onError(event);
        }
        if (failedSource) {
          this.setState({
            _source: failedSource
          });
        }
      }
    }, others));
  }
}
exports.ClassImage = ClassImage;
//# sourceMappingURL=Image.class.js.map