import React, { useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./providers/AuthProvider";
import { View, Text } from "react-native";
import SignUp from "./SignUp";

import call from "react-native-phone-call";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const args = {
    number: "923335045554", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
  };
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <SignUp></SignUp>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};

export default Routes;
