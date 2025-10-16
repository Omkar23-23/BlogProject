// Environment configuration for frontend API and app settings
// Values can be overridden at runtime via window._env_

const runtimeEnv = (typeof window !== 'undefined' && window._env_) ? window._env_ : {};

export const environment = {
  apiBaseUrl: runtimeEnv.API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default environment;
