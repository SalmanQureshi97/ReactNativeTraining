import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./app/components/SignUp";
import Home from "./app/components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Linking } from "react-native";

import call from "react-native-phone-call";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Counter from "./app/components/Counter";
import CounterDisplay from "./app/components/CounterDisplay";
import Albums from "./app/components/Albums";
import AlbumDetails from "./app/components/AlbumDetails";
import PostDetails from "./app/components/PostDetails";
import Users from "./app/components/Users";
import Ajax from "./app/components/Ajax";
import Axios from "./app/components/Axios";
import Maps from "./app/components/Maps";
import SignUpFireBase from "./app/components/SignUpFireBase";
import {
  AuthContext,
  AuthProvider,
} from "./app/components/providers/AuthProvider";
import Camera from "./app/components/Camera";
import Localization from "./app/components/Localization";
import Storage from "./app/components/Storage";
import Crud from "./app/components/Crud";

const args = {
  number: "923335045554", // String value with the number to call
  prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
};
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
                    <DrawerItem
                      label="Call Me"
                      onPress={() => {
                        // call(args).catch(console.error);
                        Linking.openURL(`tel:${args.number}`);
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

              <Drawer.Screen name="Posts" component={Home} />
              <Drawer.Screen name="Albums" component={Albums} />
              <Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="AlbumDetails"
                component={AlbumDetails}
              />
              <Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="PostDetails"
                component={PostDetails}
              />

              <Drawer.Screen name="Users" component={Users} />

              <Drawer.Screen name="Maps" component={Maps} />

              <Drawer.Screen name="Counter" component={Counter} />
              <Drawer.Screen name="CounterDisplay" component={CounterDisplay} />
              <Drawer.Screen name="CRUD" component={Crud} />
              <Drawer.Screen name="Storage" component={Storage} />
              <Drawer.Screen name="Ajax" component={Ajax} />
              <Drawer.Screen name="Axios" component={Axios} />
              <Drawer.Screen name="SignUpFireBase" component={SignUpFireBase} />
              <Drawer.Screen name="Camera" component={Camera} />
              <Drawer.Screen name="Localization" component={Localization} />
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
