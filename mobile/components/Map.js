import MapView, { Marker } from "react-native-maps";
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Icon } from 'react-native-elements';
import Polyline from  '@mapbox/polyline';

class SimpleMap extends React.Component {
  state = {
    userLocation: {
      latitude: 0,
      longitude: 0,
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
    checkinLocation: {
      coordinates: {
        latitude: null,
        longitude: null
      },
      title: "Check-in Location",
      description: ""
    },
    isMounted: false,
    followsUser: true,
    coords: [],
    isRouteable: false,
    vehicleTooltip: false,
    followUserTooltip: false,
    checkInTooltip: false
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          userLocation: {
            ...this.state.userLocation,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      })
    })
  }

  setCheckinLocation = () => {
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
      })
    })
  }

  setVehicleLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        vehicleLocation: {
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          title: this.state.vehicleLocation.title,
          description: this.state.vehicleLocation.description
        }
      })
    })
  }

  getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        let currLoc = position.coords.latitude + ',' + position.coords.longitude;
        resolve(currLoc)
      })
    })
  }

  setRoute = (currLoc, destLoc, pos) => {
    return new Promise(async (resolve, reject) => {
      let data = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${currLoc}&destination=${destLoc}&key=AIzaSyBmb9R1oZn4_chPvodHHt_yCTUpPjzTcNE&mode=walking`);
      let jsonData = await data.json();
      let points = Polyline.decode(jsonData.routes[0].overview_polyline.points);
      let routeCoords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      resolve(routeCoords)
    })
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          followsUserLocation={this.state.followsUser}
          showsScale={true}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={this.state.userLocation}
          onPress={(coords, pos) => {
            destLoc = coords.nativeEvent.coordinate.latitude + ',' + coords.nativeEvent.coordinate.longitude;
            if (!this.state.isRouteable) {
              Alert.alert(
                'Set Route',
                'Would you like to set a new route?',
                [
                  {
                    text: 'Yes', 
                    onPress: () => {
                      this.getCurrentPosition()
                        .then((currLoc) => {
                          this.setRoute(currLoc, destLoc, pos)
                            .then((routeCoords) => {
                              this.setState({
                                coords: routeCoords,
                                isRouteable: true
                              })
                            })
                            .catch((error) => {
                              console.log(error)
                            })
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    }
                  },
                  {
                    text: 'No',
                    onPress: () => console.log('Cancelled'),
                    style: 'cancel',
                  },
                ],
                {cancelable: false}
              );
            } else {
              Alert.alert(
                'Set or Remove Route',
                'Would you like to set a new route or remove the current route?',
                [
                  {
                    text: 'Set new route', 
                    onPress: () => {
                      this.getCurrentPosition()
                        .then((currLoc) => {
                          this.setRoute(currLoc, destLoc, pos)
                            .then((routeCoords) => {
                              this.setState({
                                coords: routeCoords,
                                isRouteable: true
                              })
                            })
                            .catch((error) => {
                              console.log(error)
                            })
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    }
                  },
                  {
                    text: 'Remove route',
                    onPress: () => {
                      this.setState({
                        coords: [],
                        isRouteable: false
                      })
                    }
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancelled'),
                    style: 'cancel',
                  },
                ],
                {cancelable: false}
              );
            }
          }}
        >
          {this.state.checkinLocation.coordinates.latitude &&
            <Marker
              pinColor={"#2673ef"}
              coordinate={this.state.checkinLocation.coordinates}
              title={this.state.checkinLocation.title}
              description={this.state.checkinLocation.description}
            />
          }
          {
            this.state.isRouteable == true && <MapView.Polyline 
              coordinates={this.state.coords}
              strokeWidth={2}
              strokeColor="red"
            />
          }
          {
            this.state.isRouteable == true &&
            <Marker
              coordinate={this.state.coords[0]}
              title="Route start location"
              description=""
            />
          }
          {
            this.state.isRouteable == true && 
            <Marker
              coordinate={this.state.coords[this.state.coords.length-1]}
              title="Route end location"
              description=""
            />
          }
          {
            this.state.vehicleLocation.coordinates.latitude &&
            <Marker
              coordinate={this.state.vehicleLocation.coordinates}
              title={this.state.vehicleLocation.title}
              description={this.state.vehicleLocation.description}
            />
          }
          <Text 
            style={
              this.state.vehicleTooltip 
                ? {
                  backgroundColor: 'rgb(255, 255, 255)',
                  color: 'rgb(0, 0, 0)',
                  position: 'absolute',
                  padding: 5,
                  borderWidth: 0,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 5,
                    height: 5
                  },
                  shadowOpacity: 0.5,
                  bottom: 152,
                  right: 62
                } 
                : styles.invisible
            }
          >
            Marks your vehicle location
          </Text>
          <Text 
            style={
              this.state.followUserTooltip 
                ? {
                  backgroundColor: 'rgb(255, 255, 255)',
                  color: 'rgb(0, 0, 0)',
                  position: 'absolute',
                  padding: 5,
                  borderWidth: 0,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 5,
                    height: 5
                  },
                  shadowOpacity: 0.5,
                  bottom: 86,
                  right: 62
                } 
                : styles.invisible
            }
          >
            Toggles the map following your location
          </Text>
          <Text 
            style={
              this.state.checkInTooltip 
                ? {
                  backgroundColor: 'rgb(255, 255, 255)',
                  color: 'rgb(0, 0, 0)',
                  position: 'absolute',
                  padding: 5,
                  borderWidth: 0,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 5,
                    height: 5
                  },
                  shadowOpacity: 0.5,
                  bottom: 20,
                  right: 62
                } 
                : styles.invisible
            }
          >
            Adds a marker as a check-in
          </Text>
        </MapView>
        <View style={styles.mapButtons}>
          <Icon 
            reverse 
            type="ionicon" 
            name="ios-car" 
            size={24} 
            color={"rgba(30, 144, 255, 0.75)"} 
            onPress={() => 
              this.setVehicleLocation()
            }
            onLongPress={() => {
              if (!this.state.vehicleTooltip) {
                this.setState({
                  vehicleTooltip: true
                })
                setTimeout(() => {
                  this.setState({
                    vehicleTooltip: false
                  })
                }, 5000)
              }
            }}
          />
          <Icon 
            reverse 
            type="ionicon" 
            name="ios-person" 
            size={24} 
            color={this.state.followsUser ? "rgba(30, 144, 255, 0.75)" : "rgba(180, 180, 180, 0.75)"} 
            onPress={() => {
              this.setState({followsUser: !this.state.followsUser})
            }}
            onLongPress={() => {
              if (!this.state.followUserTooltip) {
                this.setState({
                  followUserTooltip: true
                })
                setTimeout(() => {
                  this.setState({
                    followUserTooltip: false
                  })
                }, 5000)
              }
            }}
          />
          <Icon
            reverse
            type="ionicon"
            name="ios-pin"
            size={24}
            color={"rgba(30, 144, 255, 0.75)"}
            onPress={() => this.setCheckinLocation()}
            onLongPress={() => {
              if (!this.state.checkInTooltip) {
                this.setState({
                  checkInTooltip: true
                })
                setTimeout(() => {
                  this.setState({
                    checkInTooltip: false
                  })
                }, 5000)
              }
            }}
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
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  checkinMarker: {
    color: "blue"
  },
  sosMarkerText: {
    color: "white"
  },
  visible: {
  },
  invisible: {
    backgroundColor: 'transparent',
    color: 'transparent',
    borderColor: 'transparent'
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
