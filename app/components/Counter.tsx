import React, { useState } from "react";
import {
  Button,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { connect } from "react-redux";

function Counter(props: {
  increaseCounter: () => void;
  counter;
  decreaseCounter: () => void;
}) {
  return (
    <View style={styles.container}>
      <Button title="increment" onPress={() => props.increaseCounter()} />
      <Text>{props.counter}</Text>
      <Button title="decrement" onPress={() => props.decreaseCounter()} />
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
    alignItems: "center",
  },
});

function mapStateToProps(state: { counter: any }) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch: (arg0: { type: string }) => any) {
  return {
    increaseCounter: () => dispatch({ type: "INCREASE_COUNTER" }),
    decreaseCounter: () => dispatch({ type: "DECREASE_COUNTER" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
