// config/env.ts
import Constants from 'expo-constants';

const ENV = {
  development: {
    apiBaseUrl: process.env.API_BASE_URL,
  },
  staging: {
    apiBaseUrl: process.env.API_BASE_URL,
  },
  production: {
    apiBaseUrl: process.env.API_BASE_URL,
  }
};

const getEnvVars = (env = Constants.expoConfig?.extra?.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.development;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'production') {
    return ENV.production;
  } else {
    return ENV.development;
  }
};

export default getEnvVars;