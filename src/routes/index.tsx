import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import { VStack } from "native-base";

import { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";
import { Loading } from "../components/Loading";

export const Routes = () => {
  const [isLoading, setLoading] = useState(true);
  const [userLog, setUserLog] = useState<User>();

  const auth = getAuth(app);

  const userLogged = () => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUserLog(user);
    });
  };

  useEffect(() => {
    userLogged();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.900">
      <NavigationContainer>
        {userLog ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </VStack>
  );
};
