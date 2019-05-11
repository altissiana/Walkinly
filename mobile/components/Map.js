import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, View } from "react-native";

export default class SimpleMap extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 59.329323349999999,
            longitude: 18.068580800000063,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
