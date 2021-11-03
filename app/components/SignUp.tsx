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

class SignUp extends React.Component {
  async Component(email, pass) {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          //Once the user creation has happened successfully, we can add the currentUser into firestore
          //with the appropriate details.
          console.log("ARARAYSDASD");
        })
        //we need to catch the whole sign up process if it fails too.
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
        });
    } catch (e) {
      console.log(e);
    }
  }
  state = {
    name: "",
    password: "",
    email: "",
    nameError: true,
    emailError: true,
    passwordError: true,
  };

  validateName() {
    if (this.state.name.length > 3) {
      this.setState({ nameError: false });
      return;
    }
    this.setState({ nameError: true });
    return;
  }

  validateEmail() {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    this.setState({ emailError: !regexp.test(this.state.email) });
  }

  validatePassword() {
    if (this.state.password.length > 6) {
      this.setState({ passwordError: false });
      return;
    }
    this.setState({ passwordError: true });
    return;
  }

  render() {
    return (
      <View style={styles.SignUp}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          onChangeText={(text) => {
            this.validateName();
            this.setState({ name: text });
          }}
          style={styles.textInput}
          placeholder="Name"
        ></TextInput>
        {this.state.nameError ? (
          <Text style={styles.error}>minimum length : 3</Text>
        ) : null}
        <TextInput
          onChangeText={(text) => {
            this.setState({ email: text });
            this.validateEmail();
          }}
          style={styles.textInput}
          placeholder="Email"
        ></TextInput>
        {this.state.emailError ? (
          <Text style={styles.error}>Not a valid email</Text>
        ) : null}
        <TextInput
          onChangeText={(text) => {
            this.validatePassword();
            this.setState({ password: text });
          }}
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Password"
        ></TextInput>
        {this.state.passwordError ? (
          <Text style={styles.error}>Minimum length of Password is 6</Text>
        ) : null}
        <Button
          title="Sign Up"
          onPress={() => {
            if (
              !this.state.nameError &&
              !this.state.emailError &&
              !this.state.passwordError
            ) {
              //this.navigaator.navigate("Profile");
              //this.props.navigation.navigate("/path");

              this.Component(this.state.email, this.state.password);
              console.log("WOWOWOW");
            }
          }}
        />
        {/* {showResults ? (
      <ALERT name={name} email={email} password={password} />
    ) : null} */}
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

export default SignUp;
