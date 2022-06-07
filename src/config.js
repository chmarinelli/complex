const _env = process.env;

export const NODE_ENV = _env.NODE_ENV;

export const BASE_URL = _env.BASE_URL;

export const API = {
  BASE_URL: _env.VUE_APP_API_ROOT,
  TIMEOUT: 30000
};
