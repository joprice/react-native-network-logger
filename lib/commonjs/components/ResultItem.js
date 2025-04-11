"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _backHandler = require("../backHandler");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ResultItem = ({
  style,
  request,
  onPress,
  compact,
  list
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const theme = (0, _theme.useTheme)();
  const onDetailsPage = !onPress;
  const getUrlTextColor = status => {
    if (status >= 400) {
      return {
        color: getStatusTextColor(status)
      };
    }
    return {};
  };
  const getStatusTextColor = status => {
    if (status < 0) {
      return theme.colors.text;
    }
    if (status < 400) {
      return theme.colors.statusGood;
    }
    if (status < 500) {
      return theme.colors.statusWarning;
    }
    return theme.colors.statusBad;
  };
  const getStatusStyles = status => ({
    color: getStatusTextColor(status),
    borderColor: getStatusTextColor(status)
  });
  const MaybeTouchable = onPress ? _reactNative.TouchableOpacity : _reactNative.View;
  const status = request.status > 0 ? request.status : '-';
  const pad = num => `0${num}`.slice(-2);
  const getTime = time => {
    if (time === 0) return ''; // invalid time
    const date = new Date(time);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  };
  const gqlOperation = request.gqlOperation;
  const UrlContainer = list ? _reactNative.View : _reactNative.ScrollView;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(MaybeTouchable, {
    style: [styles.container, style],
    ...(onPress && {
      accessibilityRole: 'button',
      onPress
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: compact ? styles.leftContainerCompact : styles.leftContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.leftContainerSplit,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.text, styles.method],
          accessibilityLabel: `Method: ${request.method}`,
          children: request.method
        }), compact && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.time,
          children: getTime(request.startTime)
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.leftContainerSplit,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.status, getStatusStyles(request.status)],
          accessibilityLabel: `Response status ${status}`,
          children: status
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.time,
          children: request.duration > 0 ? `${request.duration}ms` : 'pending'
        }), !compact && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.time,
          children: getTime(request.startTime)
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(UrlContainer, {
      style: [styles.content],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        numberOfLines: list ? 5 : undefined,
        style: [styles.text, getUrlTextColor(request.status), onDetailsPage && !(0, _backHandler.backHandlerSet)() && styles.paddedUrl],
        children: request.url
      }), gqlOperation && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.gqlOperation,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
          style: [styles.text, styles.gqlText],
          children: ["gql: ", gqlOperation]
        })
      })]
    })]
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    flexDirection: 'row',
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  leftContainerCompact: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftContainerSplit: {
    alignItems: 'center'
  },
  status: {
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 4,
    textAlign: 'center',
    marginVertical: 3
  },
  text: {
    color: theme.colors.text,
    fontSize: 16
  },
  content: {
    paddingLeft: 5,
    paddingRight: 5,
    flexShrink: 1,
    flex: 1,
    maxHeight: 250
  },
  method: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 0,
    width: 80
  },
  time: {
    color: theme.colors.muted,
    marginTop: 5,
    marginHorizontal: 2
  },
  paddedUrl: {
    paddingVertical: 20
  },
  gqlOperation: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    alignSelf: 'flex-start',
    padding: 4,
    marginTop: 4
  },
  gqlText: {
    color: theme.colors.onSecondary,
    fontSize: 14
  }
});
var _default = exports.default = ResultItem;
//# sourceMappingURL=ResultItem.js.map