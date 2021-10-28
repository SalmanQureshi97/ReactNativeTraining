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
import Counter from "./app/components/Counter";
import CounterDisplay from "./app/components/CounterDisplay";
import { createStore } from "redux";
import { Provider } from "react-redux";

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

class App extends React.Component {
  Stack = createNativeStackNavigator();
  Drawer = createDrawerNavigator();
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <NavigationContainer>
            <this.Drawer.Navigator initialRouteName="Counter">
              <this.Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="Register"
                component={SignUp}
              />

              <this.Drawer.Screen name="Counter" component={Counter} />

              <this.Drawer.Screen
                name="CounterDisplay"
                component={CounterDisplay}
              />

              <this.Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="Home"
                component={Home}
              />

              <this.Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="Profile"
                component={Profile}
              />

              <this.Drawer.Screen
                options={{
                  drawerItemStyle: { height: 0 },
                }}
                name="Contact"
                component={Contact}
              />
            </this.Drawer.Navigator>
          </NavigationContainer>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    padding: 20,
  },
});

export default App;
