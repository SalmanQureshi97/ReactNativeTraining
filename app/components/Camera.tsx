import React, { PureComponent } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { RNCamera } from "react-native-camera";
export default class Camera extends PureComponent {
  camera: RNCamera | null | undefined;
  constructor(props) {
    super(props);
    this.state = {
      takingPic: false,
    };
  }
  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({ takingPic: true });

      try {
        const data = await this.camera.takePictureAsync(options);
        Alert.alert("Success", JSON.stringify(data));
      } catch (err) {
        Alert.alert("Error", "Failed to take picture: " + (err.message || err));
        return;
      } finally {
        this.setState({ takingPic: false });
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={{ flex: 1 }}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        />

        <Button
          icon={<Icon name="camera" size={15} color="white" />}
          onPress={this.takePicture}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
});
