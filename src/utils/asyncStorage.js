import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  } catch (error) {
    console.error("AsyncStorage setItem error:", error);
    throw error;
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  } catch (error) {
    console.error("AsyncStorage getItem error:", error);
    throw error;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("AsyncStorage removeItem error:", error);
    throw error;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("AsyncStorage clear error:", error);
    throw error;
  }
};
