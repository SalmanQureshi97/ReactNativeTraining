import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./app/components/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Counter from "./app/components/Counter";
import CounterDisplay from "./app/components/CounterDisplay";
import Users from "./app/components/Users";
import PostDetails from "./app/components/PostDetails";
import Albums from "./app/components/Albums";
import AlbumDetails from "./app/components/AlbumDetails";
import Maps from "./app/components/Maps";
import { AuthProvider } from "./app/components/providers/AuthProvider";
import SignUpFireBase from "./app/components/SignUpFirebase";

import auth from "@react-native-firebase/auth";
const initialState = {
  counter: 0,
};
const reducer = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case "INCREASE_COUNTER":
      return { counter: state.counter + 1 };
    case "DECREASE_COUNTER":
      return { counter: state.counter - 1 };
  }
  return state;
};

const store = createStore(reducer);

function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const logout = async function () {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AuthProvider>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="SignUpFireBase"
              drawerContent={(props) => {
                return (
                  <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                      label="Logout"
                      onPress={() => {
                        logout();
                      }}
                    />
                  </DrawerContentScrollView>
                );
              }}
            >
              <Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="Register"
                component={SignUp}
              />
              <Drawer.Screen name="Users" component={Users} />
              <Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="PostDetails"
                component={PostDetails}
              />
              <Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="AlbumDetails"
                component={AlbumDetails}
              />
              <Drawer.Screen name="Maps" component={Maps} />
              <Drawer.Screen name="Albums" component={Albums} />
              <Drawer.Screen name="Counter" component={Counter} />
              <Drawer.Screen name="CounterDisplay" component={CounterDisplay} />

              <Drawer.Screen name="SignUpFireBase" component={SignUpFireBase} />
            </Drawer.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </Provider>
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

export default App;
