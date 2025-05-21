import Constants from 'expo-constants';
import getEnvVars from "./env";

  export const config = {
    apiBaseUrl: getEnvVars()?.apiBaseUrl ||  Constants.expoConfig?.extra?.apiBaseUrl || "https://africavisioncard.erq.peg.mybluehost.me/api",
  };