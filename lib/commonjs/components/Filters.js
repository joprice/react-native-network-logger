"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Modal = _interopRequireDefault(require("./Modal"));
var _Button = _interopRequireDefault(require("./Button"));
var _AppContext = require("./AppContext");
var _theme = require("../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FilterButton = ({
  onPress,
  active,
  children
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    style: [styles.methodButton, active && styles.buttonActive],
    textStyle: [styles.buttonText, active && styles.buttonActiveText],
    onPress: onPress,
    accessibilityRole: "checkbox",
    accessibilityState: {
      checked: active
    },
    children: children
  });
};
const Filters = ({
  open,
  onClose
}) => {
  const {
    filter,
    dispatch
  } = (0, _AppContext.useAppContext)();
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const theme = (0, _theme.useTheme)();
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Modal.default, {
      visible: open,
      onClose: onClose,
      title: "Filters",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.subTitle,
        accessibilityRole: "header",
        children: "Method"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.methods,
        children: methods.map(method => /*#__PURE__*/(0, _jsxRuntime.jsx)(FilterButton, {
          active: filter.methods?.has(method),
          onPress: () => {
            const newMethods = new Set(filter.methods);
            if (newMethods.has(method)) {
              newMethods.delete(method);
            } else {
              newMethods.add(method);
            }
            dispatch({
              type: 'SET_FILTER',
              payload: {
                ...filter,
                methods: newMethods
              }
            });
          },
          children: method
        }, method))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.subTitle,
        accessibilityRole: "header",
        children: "Status"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.methods,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(FilterButton, {
          active: filter.statusErrors,
          onPress: () => {
            dispatch({
              type: 'SET_FILTER',
              payload: {
                ...filter,
                statusErrors: !filter.statusErrors,
                status: undefined
              }
            });
          },
          children: "Errors"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          style: styles.statusInput,
          placeholder: "Status Code",
          placeholderTextColor: theme.colors.muted,
          keyboardType: "number-pad",
          value: filter.status?.toString() || '',
          maxLength: 3,
          accessibilityLabel: "Status Code",
          onChangeText: text => {
            const status = parseInt(text, 10);
            dispatch({
              type: 'SET_FILTER',
              payload: {
                ...filter,
                statusErrors: false,
                status: isNaN(status) ? undefined : status
              }
            });
          }
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.divider
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        textStyle: styles.clearButton,
        onPress: () => {
          dispatch({
            type: 'CLEAR_FILTER'
          });
          onClose();
        },
        children: "Reset All Filters"
      })]
    })
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  subTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  filterValue: {
    fontWeight: 'bold'
  },
  methods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  methodButton: {
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.secondary
  },
  statusInput: {
    color: theme.colors.text,
    marginLeft: 10,
    borderColor: theme.colors.secondary,
    padding: 5,
    borderBottomWidth: 1,
    minWidth: 100
  },
  buttonText: {
    fontSize: 12
  },
  buttonActive: {
    backgroundColor: theme.colors.secondary
  },
  buttonActiveText: {
    color: theme.colors.onSecondary
  },
  clearButton: {
    color: theme.colors.statusBad
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.muted,
    marginTop: 20
  }
});
var _default = exports.default = Filters;
//# sourceMappingURL=Filters.js.map