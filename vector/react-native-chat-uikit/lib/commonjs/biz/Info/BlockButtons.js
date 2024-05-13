"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockButtons = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _error = require("../../error");
var _i18n = require("../../i18n");
var _Button = require("../../ui/Button");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Block Buttons Component properties.
 *
 * There are three built-in buttons, including send message button, send audio button, and send video button.
 */

const BlockButtons = props => {
  const {
    hasAudioCall = false,
    hasSendMessage = true,
    hasVideoCall = false,
    onSendMessage,
    onAudioCall,
    onVideoCall,
    onInitButton
  } = props;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const items = [];
  if (hasSendMessage) {
    items.push( /*#__PURE__*/React.createElement(_Button.BlockButton, {
      key: '100',
      iconName: 'bubble_fill',
      text: tr('_uikit_info_send_msg'),
      containerStyle: {
        height: 62,
        width: 114
      },
      onPress: onSendMessage
    }));
  }
  if (hasAudioCall) {
    items.push( /*#__PURE__*/React.createElement(_Button.BlockButton, {
      key: '101',
      iconName: 'phone_pick',
      text: tr('_uikit_info_send_audio'),
      containerStyle: {
        height: 62,
        width: 114
      },
      onPress: onAudioCall
    }));
  }
  if (hasVideoCall) {
    items.push( /*#__PURE__*/React.createElement(_Button.BlockButton, {
      key: '102',
      iconName: 'video_camera',
      text: tr('_uikit_info_send_video'),
      containerStyle: {
        height: 62,
        width: 114
      },
      onPress: onVideoCall
    }));
  }
  const _items = onInitButton ? onInitButton(items) : items;
  if (_items.length > 5) {
    throw new _error.UIKitError({
      code: _error.ErrorCode.max_count,
      desc: 'BlockButtons: items.length > 5'
    });
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }
  }, _items);
};
exports.BlockButtons = BlockButtons;
//# sourceMappingURL=BlockButtons.js.map