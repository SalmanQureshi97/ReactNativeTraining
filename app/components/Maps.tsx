import { Component, useState } from "react";
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

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

class Maps extends Component {
  state = {
    markers: [
      {
        latlng: { latitude: 33.7203, longitude: 73.0556 },
        title: "Khaddi, F7",
        description: "WOW CLOTHES",
      },
      {
        latlng: { latitude: 33.6946, longitude: 73.0144 },
        title: "Khaddi, F10",
        description: "WOW CLOTHES",
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 33.6844,
            longitude: 73.0479,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
