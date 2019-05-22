import MapView, { Marker } from "react-native-maps";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { getUserLocation } from "../actions/Actions";
import { connect } from "react-redux";

class SimpleMap extends React.Component {
  state = {
    userLocation: {
      latitude: 36.158331,
      longitude: -115.15254,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    vehicleLocation: {
      coordinates: {
        latitude: null,
        longitude: null
      },
      title: "Your vehicle",
      description: ""
    },
    isMounted: false,

    sosLocation: {
      coordinates: {
        latitude: null,
        longitude: null
      },
      title: "SOS",
      description: "",
      isUsed: false
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

  setVehicleLocation = async () => {
    if (this.state.isMounted) {
      await navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          vehicleLocation: {
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
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
  componentWillReceiveProps() {
    this.setState({
      sosLocation: {
        coordinates: {
          latitude: this.props.sosLocation.coordinates.latitude,
          longitude: this.props.sosLocation.coordinates.longitude
        },
        title: this.props.sosLocation.title,
        description: this.props.sosLocation.description,
        isUsed: true
      }
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
          {this.state.vehicleLocation.coordinates.latitude ? (
            <Marker
              coordinate={this.state.vehicleLocation.coordinates}
              title={this.state.vehicleLocation.title}
              description={this.state.vehicleLocation.description}
            />
          ) : (
            <View />
          )}

          {this.state.sosLocation.isUsed ? (
            <Marker
              style={styles.sosMarker}
              coordinate={this.props.sosLocation.coordinates}
              title={this.props.sosLocation.title}
              description={this.props.sosLocation.description}
            >
              <Text style={styles.sosMarkerText}>SOS</Text>
            </Marker>
          ) : (
            <View />
          )}
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
    position: "absolute",
    right: 0,
    bottom: 0
  },

  sosMarker: {
    borderRadius: 10,
    backgroundColor: "red"
  },

  sosMarkerText: {
    color: "white"
  }
});

function mapStateToProps(appState, ownProps) {
  return {
    ...ownProps,
    sosLocation: appState.sosLocation
  };
}

export default connect(mapStateToProps)(SimpleMap);
