import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);

  const [fetchedMessage, setFetchedMessage] = useState();
  // const token = authCtx.token;

  useEffect(() => {
    async function retrieveToken() {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
    }
    retrieveToken();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
