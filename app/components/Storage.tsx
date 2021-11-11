import { useEffect, useState } from "react";
import React from "react";
import {
  Button,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Card } from "react-native-elements";
import storage from "./providers/Storage";

function Storage({ navigation }) {
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");
  const [value2Display, set2Value] = React.useState("");

  function setStorage() {
    storage.save({
      key: key, // Note: Do not use underscore("_") in key!
      data: { value },

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600,
    });
    getData();
  }

  function getData() {
    storage
      .load({
        key: key,
      })
      .then((ret) => {
        // found data goes to then()
        set2Value(JSON.stringify(ret));
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
  useEffect(() => {
    // Update the document title using the browser API
    getData();
  }, []);

  return (
    <View style={[styles.container, styles.SignUp]}>
      <Text style={styles.header}>Value to Set</Text>
      <TextInput
        onChangeText={(text) => {
          setKey(text);
        }}
        style={styles.textInput}
        placeholder="Key"
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setValue(text);
        }}
        style={styles.textInput}
        placeholder="Value"
      ></TextInput>
      <Button
        title="Set Storage"
        onPress={() => {
          setStorage();
        }}
      />
      <Text style={styles.header}>Storage State</Text>
      <Text style={styles.text}>{value2Display} </Text>
    </View>
  );
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});

export default Storage;
