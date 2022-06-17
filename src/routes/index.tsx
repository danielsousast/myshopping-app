import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import auth from "@react-native-firebase/auth";

export function Routes() {
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setLoggedUser(user);
    });

    return subscriber;
  }, []);
  return (
    <NavigationContainer>
      {loggedUser ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
