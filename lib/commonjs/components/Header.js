"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _Icon = _interopRequireDefault(require("./Icon"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Header = ({
  children,
  shareContent
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.header,
      accessibilityRole: "header",
      testID: "header-text",
      children: children
    }), !!shareContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      name: "share",
      testID: "header-share",
      accessibilityLabel: "Share",
      onPress: () => {
        _reactNative.Share.share({
          message: shareContent
        });
      },
      iconStyle: styles.shareIcon
    })]
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    color: theme.colors.text
  },
  shareIcon: {
    width: 24,
    height: 24
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
var _default = exports.default = Header;
//# sourceMappingURL=Header.js.map