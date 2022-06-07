import axios from 'axios';
import { responseInterceptor, requestInterceptor } from './interceptors';
import { API, NODE_ENV } from '@/config';

export const http = axios.create({
  baseURL: API.BASE_URL,
  timeout:  NODE_ENV === 'production' ? API.TIMEOUT : undefined,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
http.interceptors.request.use(
  requestInterceptor.onFulfilled
);

http.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected
);