import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    async function retrieveToken() {
      const token =await AsyncStorage.getItem("token");

      if (token) {
        setAuthToken(token);
      }
    }
    retrieveToken();
  }, []);

  async function authenticate(token) {
    setAuthToken(token);

    await AsyncStorage.setItem("token", token);
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
