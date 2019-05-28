import React, { Component } from 'react';
import { Audio } from 'expo';
import { StyleSheet, View, Linking, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import alarm from '../assets/sounds/alarm.mp3';
import { connect } from 'react-redux';
import { setSosLocation, setSosStatus } from "../actions/Actions";

Audio.setIsEnabledAsync(true);

class SosButton extends Component {
  state = {
    message: {
      to: ``,
      body: ``
    },
    submitting: false,
    error: false,
    userLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    alarmSound: new Audio.Sound(),
    statusSOS: false,
    labelSOS: 'SOS',
    clickableSOS: true,
    isMounted: false,
    sosLocation: {
      coordinates: {
        latitude: null,
        longitude: null
      },
      title: "sos",
      description: ""
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
  }

  setSosLocation = () => {
    if (this.state.isMounted) {
      navigator.geolocation.getCurrentPosition(position => {
        var sosLocation = {
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          title: "sos",
          description: ""
        };
        setSosLocation(sosLocation);
      });
    }
  };

  getUserLocation = (isReturned) => {
    if (this.state.isMounted) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
          this.setState({
            userLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }
          })
          let userLatLng = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          resolve(userLatLng)
        })
      })
    }
  }

  sendSOSMessage = async () => {
    if (this.state.isMounted) {
      this.setState({ submitting: true });
      const name = await AsyncStorage.getItem('userName');
      const phone = await AsyncStorage.getItem('userPhone');
      const userLatLng = await this.getUserLocation(true);
      this.props.connections.forEach(async contact => {
        if (contact.PhoneNumber !== null) {
          this.setState({
            message: {
              to: `${contact.PhoneNumber}`,
              body: `SOS from ${name}: I may be in trouble! Here's my current location: https://www.google.com/maps/search/?api=1&query=${userLatLng.latitude},${userLatLng.longitude}. Please try to contact me at ${phone}!`
            }
          })
          fetch('http://10.68.0.155:3001/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.message)
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                this.setState({
                  error: false,
                  submitting: false,
                });
              } else {
                this.setState({
                  error: true,
                  submitting: false
                });
              }
            });
        }
      })
    }
  }

  handleSOSPress = async () => {
    if (this.state.isMounted) {
      if (this.state.clickableSOS) {
        this.setState({
          clickableSOS: false
        })
        if (!this.state.statusSOS) {
          this.setState({
            labelSOS: 'STOP'
          })
          this.sendSOSMessage()
          try {
            await this.state.alarmSound.loadAsync(alarm);
            await this.state.alarmSound.playAsync();
            await this.state.alarmSound.setIsLoopingAsync(true);
          } catch (e) {
            console.log(`cannot play the sound file or cannot turn on flashlight`, e);
          }
          setTimeout(() => { Linking.openURL(`tel:7609099640`) }, 1000)
        } else {
          this.setState({
            labelSOS: 'SOS'
          })
          setSosStatus(false);
          try {
            await this.state.alarmSound.setIsLoopingAsync(false)
            await this.state.alarmSound.stopAsync();
            await this.state.alarmSound.unloadAsync();
          } catch (e) {
            console.log('cannot stop the sound file or cannot turn off flashlight', e);
          }
        }
        this.setState({
          statusSOS: !this.state.statusSOS
        })
      }
      await setTimeout(() => {
        this.setState({
          clickableSOS: true
        })
      }, 5000);
      this.props.navigation.navigate("Home");
    }
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  render() {
    return (
      <View style={styles.fullWidth}>
        <Button
          buttonStyle={styles.sosButton}
          titleStyle={styles.sosText}
          onPress={this.handleSOSPress}
          raised
          title={this.state.labelSOS}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sosButton: {
    backgroundColor: "red",
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  sosText: {
    fontSize: 40,
    color: "#FFF"
  },
  fullWidth: {
    width: "100%"
  }
});

function mapStateToProps(appState, ownProps) {
  return {
    ...ownProps,
    connections: appState.connections
  }
}

export default connect(mapStateToProps)(SosButton);