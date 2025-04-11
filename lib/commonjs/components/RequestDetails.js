"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _backHandler = require("../backHandler");
var _ResultItem = _interopRequireDefault(require("./ResultItem"));
var _Header = _interopRequireDefault(require("./Header"));
var _Button = _interopRequireDefault(require("./Button"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Headers = ({
  title = 'Headers',
  headers
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
      shareContent: headers && JSON.stringify(headers, null, 2),
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.content,
      children: Object.entries(headers || {}).map(([name, value]) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.headerContainer,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
          style: styles.headerKey,
          children: [name, ": "]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.headerValue,
          children: value
        })]
      }, name))
    })]
  });
};
const LargeText = ({
  children
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  if (_reactNative.Platform.OS === 'ios') {
    /**
     * A readonly TextInput is used because large Text blocks sometimes don't render on iOS
     * See this issue https://github.com/facebook/react-native/issues/19453
     * Note: Even with the fix mentioned in the comments, text with ~10,000 lines still fails to render
     */
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      style: [styles.content, styles.largeContent],
      multiline: true,
      editable: false,
      value: children
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.largeContent,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      nestedScrollEnabled: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.content,
          selectable: true,
          children: children
        })
      })
    })
  });
};
const RequestDetails = ({
  request,
  onClose
}) => {
  const [responseBody, setResponseBody] = (0, _react.useState)('Loading...');
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  (0, _react.useEffect)(() => {
    (async () => {
      const body = await request.getResponseBody();
      setResponseBody(body);
    })();
  }, [request]);
  const requestBody = request.getRequestBody(!!request.gqlOperation);
  const getFullRequest = () => {
    let response;
    if (responseBody) {
      try {
        response = JSON.parse(responseBody);
      } catch {
        response = `${responseBody}`;
      }
    }
    const processedRequest = {
      ...request,
      response,
      duration: request.duration
    };
    return JSON.stringify(processedRequest, null, 2);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ResultItem.default, {
      request: request,
      style: styles.info
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      style: styles.scrollView,
      nestedScrollEnabled: true,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Headers, {
        title: "Request Headers",
        headers: request.requestHeaders
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
        shareContent: requestBody,
        children: "Request Body"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(LargeText, {
        children: requestBody
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Headers, {
        title: "Response Headers",
        headers: request.responseHeaders
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
        shareContent: responseBody,
        children: "Response Body"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(LargeText, {
        children: responseBody
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
        children: "More"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        onPress: () => _reactNative.Share.share({
          message: getFullRequest()
        }),
        fullWidth: true,
        children: "Share full request"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        onPress: () => _reactNative.Share.share({
          message: request.curlRequest
        }),
        fullWidth: true,
        children: "Share as cURL"
      })]
    }), !(0, _backHandler.backHandlerSet)() && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      onPress: onClose,
      style: styles.close,
      children: "Close"
    })]
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  info: {
    margin: 0
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 0
  },
  scrollView: {
    width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  headerKey: {
    fontWeight: 'bold',
    color: theme.colors.text
  },
  headerValue: {
    color: theme.colors.text
  },
  text: {
    fontSize: 16,
    color: theme.colors.text
  },
  content: {
    backgroundColor: theme.colors.card,
    padding: 10,
    color: theme.colors.text
  },
  largeContent: {
    maxHeight: 300
  }
});
var _default = exports.default = RequestDetails;
//# sourceMappingURL=RequestDetails.js.map