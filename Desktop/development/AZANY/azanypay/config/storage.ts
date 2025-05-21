import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageAuthKey = '@token';
export const asyncStorageOnboardingKey = '@onboarding_completed';

export const saveToAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Error saving to AsyncStorage:', error);
    return false;
  }
};

export const getFromAsyncStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error getting from AsyncStorage:', error);
    return null;
  }
};

export const removeFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from AsyncStorage:', error);
    return false;
  }
};