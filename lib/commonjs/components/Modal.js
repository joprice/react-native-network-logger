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
const NLModal = ({
  visible,
  onClose,
  children,
  title
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    visible: visible,
    animationType: "fade",
    transparent: true,
    onDismiss: onClose,
    onRequestClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.modalRoot,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
        onPress: onClose,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.backdrop
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.modalContent,
        children: [title && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.titleContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.title,
            accessibilityRole: "header",
            children: title
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
            name: "close",
            onPress: onClose,
            accessibilityLabel: "Close"
          })]
        }), children]
      })]
    })
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  modalRoot: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
    maxWidth: '100%',
    minWidth: '60%',
    backgroundColor: theme.colors.background
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -8,
    marginRight: -8
  },
  title: {
    color: theme.colors.text,
    fontSize: 25,
    fontWeight: 'bold'
  },
  backdrop: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});
var _default = exports.default = NLModal;
//# sourceMappingURL=Modal.js.map