"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _loggerSingleton = _interopRequireDefault(require("../loggerSingleton"));
var _theme = require("../theme");
var _backHandler = require("../backHandler");
var _RequestList = _interopRequireDefault(require("./RequestList"));
var _RequestDetails = _interopRequireDefault(require("./RequestDetails"));
var _createHar = _interopRequireDefault(require("../utils/createHar"));
var _Unmounted = _interopRequireDefault(require("./Unmounted"));
var _AppContext = require("./AppContext");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const sortRequests = (requests, sort) => {
  if (sort === 'asc') {
    return requests.reverse();
  }
  return [...requests];
};
const NetworkLogger = ({
  theme = 'light',
  sort = 'desc',
  compact = false,
  maxRows
}) => {
  const [requests, setRequests] = (0, _react.useState)(_loggerSingleton.default.getRequests());
  const [request, setRequest] = (0, _react.useState)();
  const [showDetails, _setShowDetails] = (0, _react.useState)(false);
  const [mounted, setMounted] = (0, _react.useState)(false);
  const [paused, setPaused] = (0, _react.useState)(_loggerSingleton.default.isPaused);
  const setShowDetails = (0, _react.useCallback)(shouldShow => {
    _setShowDetails(shouldShow);
    if (shouldShow) {
      (0, _backHandler.setBackHandler)(() => setShowDetails(false));
    } else {
      (0, _backHandler.setBackHandler)(undefined);
    }
  }, []);
  (0, _react.useEffect)(() => {
    _loggerSingleton.default.setCallback(updatedRequests => {
      setRequests([...updatedRequests]);
    });
    _loggerSingleton.default.enableXHRInterception();
    setMounted(true);
    return () => {
      // no-op if component is unmounted
      _loggerSingleton.default.setCallback(() => {});
    };
  }, [sort]);
  (0, _react.useEffect)(() => {
    const onBack = () => {
      if (showDetails) {
        setShowDetails(false);
        return true;
      }

      // Let default back handler take over
      return false;
    };
    const backHandler = _reactNative.BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, [showDetails, setShowDetails]);
  const getHar = (0, _react.useCallback)(async () => {
    const har = await (0, _createHar.default)(_loggerSingleton.default.getRequests());
    await _reactNative.Share.share({
      message: JSON.stringify(har)
    });
  }, []);
  const options = (0, _react.useMemo)(() => {
    return [{
      text: paused ? 'Resume' : 'Pause',
      onPress: async () => {
        setPaused(prev => {
          _loggerSingleton.default.onPausedChange(!prev);
          return !prev;
        });
      }
    }, {
      text: 'Clear Logs',
      onPress: async () => {
        _loggerSingleton.default.clearRequests();
      }
    }, {
      text: 'Export all Logs',
      onPress: getHar
    }];
  }, [paused, getHar]);
  const requestsInfo = (0, _react.useMemo)(() => {
    return sortRequests(requests, sort).map(r => r.toRow());
  }, [sort, requests]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_theme.ThemeContext.Provider, {
    value: theme,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AppContext.AppContextProvider, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.visible,
        children: [showDetails && !!request && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.visible,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RequestDetails.default, {
            onClose: () => setShowDetails(false),
            request: request
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: showDetails && !!request ? styles.hidden : styles.visible,
          children: mounted && !_loggerSingleton.default.enabled && !requests.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unmounted.default, {}) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [paused && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.pausedBanner,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                children: "Paused"
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RequestList.default, {
              compact: compact,
              requestsInfo: requestsInfo,
              options: options,
              showDetails: showDetails && !!request,
              maxRows: maxRows ?? requests.length,
              onPressItem: id => {
                setRequest(requests.find(r => r.id === id));
                setShowDetails(true);
              }
            })]
          })
        })]
      })
    })
  });
};
exports.default = NetworkLogger;
const styles = _reactNative.StyleSheet.create({
  visible: {
    flex: 1
  },
  hidden: {
    flex: 0
  },
  pausedBanner: {
    backgroundColor: '#ff7c7c',
    padding: 10,
    alignItems: 'center'
  }
});
//# sourceMappingURL=NetworkLogger.js.map