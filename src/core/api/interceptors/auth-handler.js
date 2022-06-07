
export const authHandler = (config) => {
  const token = process.env.VUE_APP_GRAPHQL_TOKEN;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
};
