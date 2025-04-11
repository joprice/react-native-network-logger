"use strict";

import BlobFileReader from 'react-native/Libraries/Blob/FileReader';
import fromEntries from './utils/fromEntries';
export default class NetworkRequestInfo {
  id = '';
  type = '';
  url = '';
  status = -1;
  dataSent = '';
  responseContentType = '';
  responseSize = 0;
  requestHeaders = {};
  responseHeaders = {};
  response = '';
  responseURL = '';
  responseType = '';
  timeout = 0;
  closeReason = '';
  messages = '';
  serverClose = undefined;
  serverError = undefined;
  startTime = 0;
  endTime = 0;
  updatedAt = 0;
  constructor(id, type, method, url) {
    this.id = id;
    this.type = type;
    this.method = method;
    this.url = url;
    this.updatedAt = Date.now();
  }
  get duration() {
    return this.endTime - this.startTime;
  }
  get curlRequest() {
    let headersPart = this.requestHeaders && Object.entries(this.requestHeaders).map(([key, value]) => `'${key}: ${this.escapeQuotes(value)}'`).join(' -H ');
    headersPart = headersPart ? `-H ${headersPart}` : '';
    const body = this.dataSent && this.escapeQuotes(this.dataSent);
    const methodPart = this.method !== 'GET' ? `-X${this.method.toUpperCase()}` : '';
    const bodyPart = body ? `-d '${body}'` : '';
    const parts = ['curl', methodPart, headersPart, bodyPart, `'${this.url}'`];
    return parts.filter(Boolean).join(' ');
  }
  update(values) {
    Object.assign(this, values);
    if (values.dataSent) {
      const data = this.parseData(values.dataSent);
      this.gqlOperation = data?.operationName;
    }
    this.updatedAt = Date.now();
  }
  escapeQuotes(value) {
    return value.replace?.(/'/g, `\\'`);
  }
  parseData(data) {
    try {
      if (data?._parts?.length) {
        return fromEntries(data?._parts);
      }
      return JSON.parse(data);
    } catch {
      return {
        data
      };
    }
  }
  stringifyFormat(data) {
    return JSON.stringify(this.parseData(data), null, 2);
  }
  toRow() {
    return {
      url: this.url,
      gqlOperation: this.gqlOperation,
      id: this.id,
      method: this.method,
      status: this.status,
      duration: this.duration,
      startTime: this.startTime
    };
  }
  getRequestBody(replaceEscaped = false) {
    const body = this.stringifyFormat(this.dataSent);
    if (replaceEscaped) {
      return body.replace(/\\n/g, '\n').replace(/\\"/g, '"');
    }
    return body;
  }
  async parseResponseBlob() {
    const blobReader = new BlobFileReader();
    blobReader.readAsText(this.response);
    return await new Promise((resolve, reject) => {
      const handleError = () => reject(blobReader.error);
      blobReader.addEventListener('load', () => {
        resolve(blobReader.result);
      });
      blobReader.addEventListener('error', handleError);
      blobReader.addEventListener('abort', handleError);
    });
  }
  async getResponseBody() {
    const body = await (this.responseType !== 'blob' ? this.response : this.parseResponseBlob());
    return this.stringifyFormat(body);
  }
}
//# sourceMappingURL=NetworkRequestInfo.js.map