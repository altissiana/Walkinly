import MapView, { Marker } from "react-native-maps";
import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Icon } from 'react-native-elements';
import Polyline from  '@mapbox/polyline';

export default class SimpleMap extends React.Component {
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
    isMounted: false,
    followsUser: true,
    coords: [],
    isRouteable: false
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

  setVehicleLocation = () => {
    this.setState({
      vehicleLocation: {
        ...this.state.vehicleLocation,
        coordinates: {
          latitude: this.state.userLocation.latitude,
          longitude: this.state.userLocation.longitude
        },
      }
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
    })
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
          }}
        >
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
    bottom: 0,
  }
});
