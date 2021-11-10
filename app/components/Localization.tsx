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
import { strings } from "./providers/Localization";

class Localization extends React.Component {
  state = {
    lang: "en",
  };

  render() {
    return (
      <View style={styles.SignUp}>
        <Text style={styles.text}>{strings.boiledEgg}</Text>

        <Button
          title="Toggle Language"
          onPress={() => {
            if (this.state.lang === "en") {
              strings.setLanguage("it");
              this.setState({ lang: "it" });
            } else {
              strings.setLanguage("en");
              this.setState({ lang: "en" });
            }
          }}
        />
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

export default Localization;
