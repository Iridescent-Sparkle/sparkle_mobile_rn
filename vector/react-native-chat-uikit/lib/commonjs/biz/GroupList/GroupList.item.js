"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupListItem = GroupListItem;
exports.GroupListItemMemo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Text = require("../../ui/Text");
var _Avatar = require("../Avatar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Group List Item Component.
 */
function GroupListItem(props) {
  const {
    data,
    onClicked,
    onLongPressed
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    t1: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    divider: {
      light: colors.neutral[9],
      dark: colors.neutral[2]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      backgroundColor: getColor('bg')
    },
    onPress: () => {
      onClicked === null || onClicked === void 0 ? void 0 : onClicked(data);
    },
    onLongPress: () => {
      onLongPressed === null || onLongPressed === void 0 ? void 0 : onLongPressed(data);
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      height: 59.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(_Avatar.GroupAvatar, {
    url: data.groupAvatar,
    size: 40
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column',
      flexGrow: 1,
      paddingLeft: 12,
      maxWidth: '80%'
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    paletteType: 'title',
    textType: 'medium'
  }, data.groupName === undefined || data.groupName.length === 0 ? data.groupId : data.groupName))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
const GroupListItemMemo = /*#__PURE__*/React.memo(GroupListItem);
exports.GroupListItemMemo = GroupListItemMemo;
//# sourceMappingURL=GroupList.item.js.map