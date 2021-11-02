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
function Albums({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [albums, setAlbums] = React.useState([]);

  const getUserName = function (userId: any) {
    let data = users;
    let selectedUser: any;
    data.forEach((obj) => {
      if (obj.id === userId) {
        selectedUser = obj.username;
        return;
      }
    });
    return selectedUser;
  };

  const getMovies = async function () {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const json = await response.json();

      setAlbums(json);
    } catch (error) {
      console.log(error);
    } finally {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    getMovies();
  });

  return (
    <View style={[styles.container, styles.horizontal]}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={albums}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Card>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                Created By : {getUserName(item.userId)}
              </Text>
              <Button
                onPress={() => {
                  navigation.navigate("AlbumDetails", {
                    itemId: item.id,
                  });
                }}
                title="VIEW ALBUM"
              />
            </Card>
          )}
        />
      )}
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

export default Albums;
