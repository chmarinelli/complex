import { responseErrorHandler } from './error-handler';
import { authHandler } from './auth-handler';

export const requestInterceptor = {
  onFulfilled: (config) => {
    authHandler(config);
    return config;
  }
};

export const responseInterceptor = {
    onFulfilled(response) {
        return response;
    },
    onRejected(error) {
      responseErrorHandler(error);
      return error;
    }
};