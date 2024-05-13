"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultListSearchItem = DefaultListSearchItem;
exports.ListSearchItem = ListSearchItem;
exports.StateListSearchItem = StateListSearchItem;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Text = require("../../ui/Text");
var _Avatar = require("../Avatar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ListSearchItem(props) {
  const {
    searchType
  } = props;
  if (searchType === 'create-group' || searchType === 'add-group-member') {
    const p = props;
    return /*#__PURE__*/React.createElement(StateListSearchItem, p);
  }
  return /*#__PURE__*/React.createElement(DefaultListSearchItem, props);
}
function DefaultListSearchItem(props) {
  const {
    data,
    keyword,
    onClicked
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
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      height: 75.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(_Avatar.Avatar, {
    url: data.avatar,
    size: 50
  }), /*#__PURE__*/React.createElement(_Text.HighText, {
    paletteType: 'title',
    textType: 'medium',
    containerStyle: {
      flexDirection: 'row',
      flexGrow: 1,
      paddingLeft: 12
    },
    keyword: keyword,
    content: data.name ?? data.id
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
function StateListSearchItem(props) {
  const {
    data,
    keyword,
    onClicked
  } = props;
  const {
    checked,
    onCheckClicked,
    disable
  } = data;
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
    },
    disable: {
      light: colors.neutral[7],
      dark: colors.neutral[4]
    },
    enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      backgroundColor: getColor('bg')
    },
    onPress: () => {
      if (checked !== undefined) {
        if (disable !== true) {
          onCheckClicked === null || onCheckClicked === void 0 ? void 0 : onCheckClicked(data);
        }
      } else {
        onClicked === null || onClicked === void 0 ? void 0 : onClicked(data);
      }
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      height: 75.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    }
  }, checked !== undefined ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      marginRight: 12
    }
  }, /*#__PURE__*/React.createElement(_Button.IconButton, {
    iconName: checked !== false ? 'checked_rectangle' : 'unchecked_rectangle',
    style: {
      height: 28,
      width: 28,
      tintColor: getColor(checked === true && disable !== true ? 'enable' : 'disable')
    },
    onPress: () => {
      if (disable !== true) {
        onCheckClicked === null || onCheckClicked === void 0 ? void 0 : onCheckClicked(data);
      }
    }
  })) : null, /*#__PURE__*/React.createElement(_Avatar.Avatar, {
    url: data.avatar,
    size: 50
  }), /*#__PURE__*/React.createElement(_Text.HighText, {
    paletteType: 'title',
    textType: 'medium',
    containerStyle: {
      flexDirection: 'row',
      flexGrow: 1,
      paddingLeft: 12
    },
    keyword: keyword,
    content: data.name ?? data.userId
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
//# sourceMappingURL=ListSearch.item.js.map