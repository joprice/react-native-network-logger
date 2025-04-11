"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const icons = {
  close: require('./images/close.png'),
  filter: require('./images/filter.png'),
  more: require('./images/more.png'),
  search: require('./images/search.png'),
  share: require('./images/share.png')
};
const Icon = ({
  name,
  onPress,
  accessibilityLabel,
  iconStyle,
  ...rest
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const Wrapper = onPress ? _reactNative.TouchableOpacity : _react.Fragment;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, {
    ...(onPress && {
      onPress,
      accessibilityLabel,
      accessibilityRole: 'button',
      style: styles.iconWrapper,
      ...rest
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: icons[name],
      resizeMode: "contain",
      style: [styles.icon, onPress && styles.iconButton, iconStyle]
    })
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: 'center',
    tintColor: theme.colors.muted
  },
  iconButton: {
    tintColor: theme.colors.text
  },
  iconWrapper: {
    alignSelf: 'center'
  }
});
var _default = exports.default = Icon;
//# sourceMappingURL=Icon.js.map