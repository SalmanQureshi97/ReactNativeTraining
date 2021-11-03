import React, { useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./providers/AuthProvider";
import { View, Text } from "react-native";
import SignUp from "./SignUp";

const SignUpFireBase = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

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
        <SignUp navigation={undefined}></SignUp>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};

export default SignUpFireBase;
