import MapView, { Marker } from "react-native-maps";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

class SimpleMap extends React.Component {
  state = {
    userLocation: {
      latitude: 36.158331,
      longitude: -115.15254,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },

    isMounted: false,

    checkinLocation: {
      coordinates: {
        latitude: null,
        longitude: null
      },

      title: "Check-in Location",
      description: ""
    }
  };

  componentDidMount() {
    this.setState({
      isMounted: true
    });
    this.getUserLocation();
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
        });
      });
    }
  };

  setVehicleLocation = () => {
    if (this.state.isMounted) {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.vehicleLocation = {
          vehicleLocation: {
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            title: this.props.vehicleLocation.title,
            description: this.props.vehicleLocation.description
          }
        };
      });
    }
  };

  setCheckinLocation = () => {
    if (this.state.isMounted) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          checkinLocation: {
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            title: this.state.checkinLocation.title,
            description: this.state.checkinLocation.description
          }
        });
      });
    }
  };

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
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
          {this.props.vehicleLocation.coordinates.latitude ? (
            <Marker
              coordinate={this.props.vehicleLocation.coordinates}
              title={this.props.vehicleLocation.title}
              description={this.props.vehicleLocation.description}
            />
          ) : (
            <View />
          )}

          {this.state.checkinLocation.coordinates.latitude ? (
            <Marker
              pinColor={"#2673ef"}
              coordinate={this.state.checkinLocation.coordinates}
              title={this.state.checkinLocation.title}
              description={this.state.checkinLocation.description}
            />
          ) : (
            <View />
          )}
        </MapView>
        <View style={styles.mapButtons}>
          <Icon
            reverse
            type="ionicon"
            name="ios-car"
            size={24}
            color={"rgba(30, 144, 255, 0.75)"}
            onPress={() => this.setVehicleLocation()}
          />
          <Icon
            reverse
            type="ionicon"
            name="ios-pin"
            size={24}
            color={"rgba(30, 144, 255, 0.75)"}
            onPress={() => this.setCheckinLocation()}
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
  mapButtons: {
    position: "absolute",
    right: 0,
    bottom: 0
  },

  checkinMarker: {
    color: "blue"
  },

  sosMarkerText: {
    color: "white"
  }
});

function mapStateToProps(appState, ownProps) {
  return {
    ...ownProps,
    sosLocation: appState.sosLocation,
    vehicleLocation: appState.vehicleLocation,
    isActive: appState.isActive
  };
}

export default connect(mapStateToProps)(SimpleMap);
