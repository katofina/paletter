import AsyncStorage from "@react-native-async-storage/async-storage";

export const startSession = (
  email: string | null,
  accessToken: string,
): void => {
  AsyncStorage.setItem("email", email!);
  AsyncStorage.setItem("accessToken", accessToken);
};

export const getSession = () => {
  return {
    email: AsyncStorage.getItem("email"),
    accessToken: AsyncStorage.getItem("accessToken"),
  };
};

export const endSession = async (): Promise<void> => {
  await AsyncStorage.clear();
};

export const isLoggedIn = () => {
  return getSession().accessToken;
};
