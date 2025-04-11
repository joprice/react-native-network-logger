"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Button = ({
  children,
  fullWidth,
  style,
  textStyle,
  onPress,
  ...rest
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    accessibilityRole: "button",
    onPress: onPress,
    style: style,
    ...rest,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.button, fullWidth && styles.fullWidth, textStyle],
      children: children
    })
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  button: {
    color: theme.colors.link,
    fontSize: 18,
    padding: 10,
    alignSelf: 'flex-start'
  },
  fullWidth: {
    alignSelf: 'center'
  }
});
var _default = exports.default = Button;
//# sourceMappingURL=Button.js.map