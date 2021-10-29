import { useFocusEffect } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
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

function PostDetails({ navigation, route }) {
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [data, setData] = React.useState([]);
  //const val = navigation.route.params.itemId;

  useEffect(() => {
    // Update the document title using the browser API
    setLoading(true);
    // setData([]);
    getPostDetails();
    // return function cleanup() {
    //   console.log("CLEANINGUP");
    // };
  }, [route.params.itemId]);

  useEffect(() => {
    // Update the document title using the browser API
    getUserPosts();
    // return function cleanup() {
    //   console.log("CLEANINGUP");
    // };
  }, [data]);

  useEffect(() => {
    // Update the document title using the browser API

    setLoading(false);
    // return function cleanup() {
    //   console.log("CLEANINGUP");
    // };
  }, [posts]);

  // useFocusEffect(

  //   React.useCallback(() => {
  //     console.log("SETTING");
  //     console.log(route.params.itemId, itemId, route.params.userName);
  //     // setLoading(true);
  //     // setData([]);
  //     // setPosts([]);
  //     // setItemId(route.params.itemId);
  //     // console.log(route.params.itemId, itemId);
  //     // getPostDetails();
  //   }, [])
  // );

  const getUserPosts = function () {
    let Data = data;
    let userPosts = [];
    Data.forEach((obj) => {
      if (obj.userId === route.params.itemId) {
        userPosts.push(obj);
      }
    });
    setPosts(userPosts);
    setLoading(false);
  };

  const getPostDetails = async function () {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, styles.horizontal]}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Card>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>{item.body}</Text>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                Posted By : {route.params.userName}
              </Text>
              {/* <Button
                  onPress={() => {
                    this.props.navigation.navigate("PostDetails", {
                      itemId: item.id,
                    });
                  }}
                  style={styles.buttonStyle}
                  title="VIEW NOW"
                /> */}
            </Card>
          )}
        />
        // <Card>
        //   <Card.Title>{this.state.post.title}</Card.Title>
        //   <Card.Divider />
        //   <Text style={{ marginBottom: 10 }}>{this.state.post.body}</Text>
        //   <Card.Divider />
        //   <Text style={{ marginBottom: 10 }}>asdad</Text>
        // </Card>
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

export default PostDetails;
