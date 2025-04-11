"use strict";

import logger from './loggerSingleton';
export { default } from './components/NetworkLogger';
export const startNetworkLogging = options => {
  logger.enableXHRInterception(options);
};
export const stopNetworkLogging = () => {
  logger.disableXHRInterception();
};
export const getRequests = () => logger.getRequests();
export const clearRequests = () => logger.clearRequests();
export { getBackHandler } from './backHandler';
//# sourceMappingURL=index.js.map