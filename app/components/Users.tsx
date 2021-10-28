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
import { Card } from "react-native-elements";
class Users extends React.Component {
  state = {
    loading: true,
    posts: [],
  };

  async getMovies() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      this.setState({ posts: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Card>
                <Card.Title>{item.username}</Card.Title>
                <Card.Divider />
                <Text style={{ marginBottom: 10 }}>{item.name}</Text>
                <Text style={{ marginBottom: 10 }}>{item.email}</Text>
                <Text style={{ marginBottom: 10 }}>{item.phone}</Text>
                <Text style={{ marginBottom: 10 }}>{item.company.name}</Text>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate("PostDetails", {
                      itemId: item.id,
                    });
                  }}
                  style={styles.buttonStyle}
                  title="VIEW POSTS"
                />
              </Card>
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
});

export default Users;
