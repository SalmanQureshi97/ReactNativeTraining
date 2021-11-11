import React, { useContext } from "react";
import {
  Button,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import auth from "@react-native-firebase/auth";
import storage from "./providers/Storage";

class Storage extends React.Component {
  state = {
    key: "",
    value: "",
    value2Display: "",
  };

  setStorage() {
    storage.save({
      key: this.state.key, // Note: Do not use underscore("_") in key!
      data: this.state.value,

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600,
    });
    this.getData();
  }

  getData() {
    storage
      .load({
        key: this.state.key,
      })
      .then((ret) => {
        // found data goes to then()
        this.setState({ value2Display: JSON.stringify(ret) });
      })
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            break;
          case "ExpiredError":
            // TODO
            break;
        }
      });
  }

  render() {
    return (
      <View style={styles.SignUp}>
        <Text style={styles.header}>Value to Set</Text>
        <TextInput
          onChangeText={(text) => {
            this.setState({ key: text });
          }}
          style={styles.textInput}
          placeholder="Key"
        ></TextInput>
        <TextInput
          onChangeText={(text) => {
            this.setState({ value: text });
          }}
          style={styles.textInput}
          placeholder="Value"
        ></TextInput>
        <Button
          title="Set Storage"
          onPress={() => {
            this.setStorage();
          }}
        />
        <Text style={styles.header}>Storage State</Text>
        <Text style={styles.text}>{this.state.value2Display} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SignUp: {
    alignSelf: "stretch",
  },
  header: {
    fontSize: 24,
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#000000",
    borderBottomWidth: 2,
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    borderBottomColor: "#000000",
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 10,
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  error: {
    fontSize: 10,
    paddingBottom: 1,
    marginTop: -30,
    borderBottomColor: "#ff0000",
    borderBottomWidth: 1,
  },
});

export default Storage;
