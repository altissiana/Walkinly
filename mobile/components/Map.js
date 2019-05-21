import MapView, { Marker } from "react-native-maps";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from 'react-native-elements'

export default class SimpleMap extends React.Component {
  state = {
    userLocation: {
      latitude: 36.158331,
      longitude: -115.152540,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    vehicleLocation: {
      coordinates: {
        latitude: null, 
        longitude: null
      },
      title: 'Your vehicle',
      description: ''
    },
    isMounted: false
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
    this.getUserLocation()
  }

  getUserLocation = async () => {
    if (this.state.isMounted) {
      await navigator.geolocation.getCurrentPosition(position => {
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
  }

  setVehicleLocation = () => {
    this.setState({
      vehicleLocation: {
        coordinates: {
          latitude: this.state.userLocation.latitude,
          longitude: this.state.userLocation.longitude
        },
      }
    })
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
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
          region={this.state.userLocation}
        >
          {
            this.state.vehicleLocation.coordinates.latitude
            ? <Marker
                coordinate={this.state.vehicleLocation.coordinates}
                title={this.state.vehicleLocation.title}
                description={this.state.vehicleLocation.description}
              />
            : <View></View>
          }
        </MapView>
        <View style={styles.vehicleMarkerButton}>
          <Icon 
            reverse 
            type="ionicon" 
            name="ios-car" 
            size={24} 
            color={"rgba(30, 144, 255, 0.75)"} 
            onPress={() => this.setVehicleLocation()}
          />
        </View>
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
  },
  vehicleMarkerButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  }
});
