
export const authHandler = (config) => {
  const token = process.env.VUE_APP_GITLAB_API_TOKEN;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
};
