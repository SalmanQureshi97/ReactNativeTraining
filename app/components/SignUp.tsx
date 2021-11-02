import React from "react";
import {
  Button,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
export default function SignUp({ navigation }: { navigation: any }) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameError, setNameError] = React.useState(true);
  const [emailError, setEmailError] = React.useState(true);
  const [passwordError, setPasswordError] = React.useState(true);

  const validateName = function () {
    if (name.length > 3) {
      setNameError(false);
      return;
    }
    setNameError(true);
    return;
  };

  const validateEmail = function () {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    setEmailError(!regexp.test(email));
  };

  const validatePassword = function () {
    if (password.length > 6) {
      setPasswordError(false);
      return;
    }
    setPasswordError(true);
    return;
  };

  const ALERT = (props: any) => {
    return (
      <View>
        {nameError ? <Text style={styles.header}>NAME HAS ERROR</Text> : null}
        <Text style={styles.header}>Name : {props.name}</Text>

        <Text style={styles.header}>Email : {props.email}</Text>

        <Text style={styles.header}>Password :{props.password}</Text>
      </View>
    );
  };

  return (
    <View style={styles.SignUp}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        onChangeText={(text) => {
          validateName();
          setName(text);
        }}
        style={styles.textInput}
        placeholder="Name"
      ></TextInput>
      {nameError ? <Text style={styles.error}>minimum length : 3</Text> : null}
      <TextInput
        onChangeText={(text) => {
          setEmail(text);
          validateEmail();
        }}
        style={styles.textInput}
        placeholder="Email"
      ></TextInput>
      {emailError ? <Text style={styles.error}>Not a valid email</Text> : null}
      <TextInput
        onChangeText={(text) => {
          validatePassword();
          setPassword(text);
        }}
        secureTextEntry={true}
        style={styles.textInput}
        placeholder="Password"
      ></TextInput>
      {passwordError ? (
        <Text style={styles.error}>Minimum length of Password is 6</Text>
      ) : null}
      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate("Counter");
          if (!nameError && !emailError && !passwordError) {
            navigation.navigate("Home");
          }
        }}
      />
      {/* {showResults ? (
        <ALERT name={name} email={email} password={password} />
      ) : null} */}
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
});
