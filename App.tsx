import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./app/components/SignUp";
import Home from "./app/components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./app/components/Profile";
import Contact from "./app/components/Contact";
export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="SignUp">
          <Drawer.Screen name="Register" component={SignUp} />
          <Drawer.Screen name="Home" component={Home} />

          <Drawer.Screen name="Profile" component={Profile} />

          <Drawer.Screen name="Contact" component={Contact} />
        </Drawer.Navigator>
      </NavigationContainer>

      {/* <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Profile" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    padding: 20,
  },
});
