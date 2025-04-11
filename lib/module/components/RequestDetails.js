"use strict";

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Share, TextInput, Platform } from 'react-native';
import { useThemedStyles } from '../theme';
import { backHandlerSet } from '../backHandler';
import ResultItem from './ResultItem';
import Header from './Header';
import Button from './Button';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Headers = ({
  title = 'Headers',
  headers
}) => {
  const styles = useThemedStyles(themedStyles);
  return /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsx(Header, {
      shareContent: headers && JSON.stringify(headers, null, 2),
      children: title
    }), /*#__PURE__*/_jsx(View, {
      style: styles.content,
      children: Object.entries(headers || {}).map(([name, value]) => /*#__PURE__*/_jsxs(View, {
        style: styles.headerContainer,
        children: [/*#__PURE__*/_jsxs(Text, {
          style: styles.headerKey,
          children: [name, ": "]
        }), /*#__PURE__*/_jsx(Text, {
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
  const styles = useThemedStyles(themedStyles);
  if (Platform.OS === 'ios') {
    /**
     * A readonly TextInput is used because large Text blocks sometimes don't render on iOS
     * See this issue https://github.com/facebook/react-native/issues/19453
     * Note: Even with the fix mentioned in the comments, text with ~10,000 lines still fails to render
     */
    return /*#__PURE__*/_jsx(TextInput, {
      style: [styles.content, styles.largeContent],
      multiline: true,
      editable: false,
      value: children
    });
  }
  return /*#__PURE__*/_jsx(View, {
    style: styles.largeContent,
    children: /*#__PURE__*/_jsx(ScrollView, {
      nestedScrollEnabled: true,
      children: /*#__PURE__*/_jsx(View, {
        children: /*#__PURE__*/_jsx(Text, {
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
  const [responseBody, setResponseBody] = useState('Loading...');
  const styles = useThemedStyles(themedStyles);
  useEffect(() => {
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
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(ResultItem, {
      request: request,
      style: styles.info
    }), /*#__PURE__*/_jsxs(ScrollView, {
      style: styles.scrollView,
      nestedScrollEnabled: true,
      children: [/*#__PURE__*/_jsx(Headers, {
        title: "Request Headers",
        headers: request.requestHeaders
      }), /*#__PURE__*/_jsx(Header, {
        shareContent: requestBody,
        children: "Request Body"
      }), /*#__PURE__*/_jsx(LargeText, {
        children: requestBody
      }), /*#__PURE__*/_jsx(Headers, {
        title: "Response Headers",
        headers: request.responseHeaders
      }), /*#__PURE__*/_jsx(Header, {
        shareContent: responseBody,
        children: "Response Body"
      }), /*#__PURE__*/_jsx(LargeText, {
        children: responseBody
      }), /*#__PURE__*/_jsx(Header, {
        children: "More"
      }), /*#__PURE__*/_jsx(Button, {
        onPress: () => Share.share({
          message: getFullRequest()
        }),
        fullWidth: true,
        children: "Share full request"
      }), /*#__PURE__*/_jsx(Button, {
        onPress: () => Share.share({
          message: request.curlRequest
        }),
        fullWidth: true,
        children: "Share as cURL"
      })]
    }), !backHandlerSet() && /*#__PURE__*/_jsx(Button, {
      onPress: onClose,
      style: styles.close,
      children: "Close"
    })]
  });
};
const themedStyles = theme => StyleSheet.create({
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
export default RequestDetails;
//# sourceMappingURL=RequestDetails.js.map