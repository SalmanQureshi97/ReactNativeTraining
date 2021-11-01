import React, { useState } from "react";
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
const axios = require("axios");
import { Card } from "react-native-elements";
class Axios extends React.Component {
  state = {
    loading: true,
    albums: [],
    users: [],
  };

  getUserName(userId: any) {
    let data = this.state.users;
    let selectedUser: any;
    data.forEach((obj) => {
      if (obj.id === userId) {
        selectedUser = obj.username;
        return;
      }
    });
    return selectedUser;
  }

  async getMovies() {
    let self = this;
    await axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        // handle success
        // const json = JSON.str(response);
        this.setState({ albums: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(async () => {
        // always executed
        try {
          await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
              this.setState({ users: res.data });
            });
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
      });
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <View style={[styles.container]}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={this.state.albums}
            numColumns={2}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  margin: 1,
                }}
              >
                <Card>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Divider />
                  <Text style={{ marginBottom: 10 }}>
                    Created By : {this.getUserName(item.userId)}
                  </Text>
                </Card>
              </View>
            )}
          />
        )}
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
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default Axios;
