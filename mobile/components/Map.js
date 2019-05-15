import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, View } from "react-native";

export default class SimpleMap extends React.Component {
  state = {
    userLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }
  }

  componentDidMount() {
    this.getUserLocation()
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          followsUserLocation={true}
          showsScale={true}
          showsUserLocation={true}
          style={styles.map}
          region={{
            latitude: this.state.userLocation.latitude,
            longitude: this.state.userLocation.longitude,
            latitudeDelta: this.state.userLocation.latitudeDelta,
            longitudeDelta: this.state.userLocation.longitudeDelta
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
