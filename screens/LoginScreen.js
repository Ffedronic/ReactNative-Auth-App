import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isLogging, setIsLogging] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLogging(true);
    try {
      const idToken = await login(email, password);
      await authCtx.authenticate(idToken);
    } catch (error) {
      Alert.alert(
        "An error occured",
        "Could not login you. Verify your credentials!"
      );
      setIsLogging(false);
    }
  }

  if (isLogging) {
    return <LoadingOverlay message={"Logging you in..."} />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
