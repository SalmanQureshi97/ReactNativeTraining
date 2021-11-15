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
  Modal,
  Pressable,
} from "react-native";
import { Card } from "react-native-elements";
class Crud extends React.Component {
  state = {
    loading: true,
    posts: [],
    modalVisible: false,
    user: { name: "", profession: "", id: "" },
    currUserName: "",
    currUserProfession: "",
    currUserId: "",
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  async getMovies() {
    try {
      const response = await fetch("http://10.0.2.2:8080/listUsers");
      const json = await response.json();
      this.setState({ posts: json.data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async deleteUser(id) {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://10.0.2.2:8080/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });
      const json = await response.json();
      console.log(json);

      this.setState({ posts: json.data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async createUser(newUser) {
    try {
      // this.setState({ loading: true });
      const response = await fetch("http://10.0.2.2:8080/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user: newUser }),
      });
      const json = await response.json();
      console.log(json);

      this.setState({ posts: json.data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async updateUser(updatedUser) {
    try {
      this.setState({ loading: true });
      const response = await fetch("http://10.0.2.2:8080/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ userId: updatedUser.id, user: updatedUser }),
      });
      const json = await response.json();
      console.log(json);

      this.setState({ posts: json.data });
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
      <View style={[]}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            horizontal
            data={this.state.posts}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <Card>
                <Card.Title>{item.name}</Card.Title>
                <Card.Divider />
                <Card.Title>{item.profession}</Card.Title>
                <Button
                  onPress={() => {
                    this.setState({ user: item });
                    this.setModalVisible(true);
                    this.setState({ currUserId: item.id });

                    this.setState({ currUserName: item.name });
                    this.setState({ currUserProfession: item.profession });
                  }}
                  title="Edit"
                />
                <View style={styles.space} />
                <Button
                  onPress={() => {
                    this.deleteUser(item.id);
                  }}
                  title="Delete"
                />
              </Card>
            )}
          />
        )}
        <View style={styles.buttonStyleNew}>
          <Button
            title="Create"
            onPress={() => {
              var noUser = { name: "", profession: "", id: "" };
              this.setState({ user: noUser });
              this.setModalVisible(true);
              this.setState({ currUserId: noUser.id });

              this.setState({ currUserName: noUser.name });
              this.setState({ currUserProfession: noUser.profession });
            }}
          />
        </View>

        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({ currUserName: text });
                  }}
                  style={styles.textInput}
                  placeholder={this.state.user.name}
                ></TextInput>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({ currUserProfession: text });
                  }}
                  style={styles.textInput}
                  placeholder={this.state.user.profession}
                ></TextInput>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    var updatedUser = {
                      id: this.state.currUserId,
                      name: this.state.currUserName,
                      profession: this.state.currUserProfession,
                    };
                    if (this.state.currUserId) {
                      this.updateUser(updatedUser);
                    } else {
                      this.createUser(updatedUser);
                    }

                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
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
  space: {
    width: 20, // or whatever size you need
    height: 20,
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
  buttonStyleNew: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Crud;
