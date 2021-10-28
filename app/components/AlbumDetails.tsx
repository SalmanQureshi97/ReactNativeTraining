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

class AlbumDetails extends React.Component {
  focusListener: any;
  state = {
    loading: true,
    itemId: this.props.route.params.itemId,
    hasPosts: false,
    posts: [],
    data: [],
  };

  async getPostDetails() {
    try {
      let itemId = this.state.itemId;
      console.log(
        `https://jsonplaceholder.typicode.com/albums/${itemId}/photos`
      );
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${itemId}/photos`
      );
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.setState({
        loading: true,
        itemId: this.props.route.params.itemId,
        hasPosts: false,
        posts: [],
        data: [],
      });
      this.getPostDetails();
    });
  }

  //   componentWillUnmount() {
  //     if (this.focusListener) {
  //       this.focusListener.remove();
  //     }
  //   }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Card>
                <Card.Title>{item.title}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: item.thumbnailUrl }}></Card.Image>
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
  logo: {
    width: 66,
    height: 58,
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

export default AlbumDetails;
