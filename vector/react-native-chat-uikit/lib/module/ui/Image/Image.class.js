function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Image as RNImage } from 'react-native';
export class ClassImage extends React.PureComponent {
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
    return /*#__PURE__*/React.createElement(RNImage, _extends({
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
//# sourceMappingURL=Image.class.js.map