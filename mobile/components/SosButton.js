import React, { Component } from 'react';
import { Audio } from 'expo';
import { StyleSheet, View, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import alarm from '../assets/sounds/alarm.mp3'

Audio.setIsEnabledAsync(true)

class SosButton extends Component {
  state = {
    message: {
      to: `5733303465`,
      body: `SOS FROM <user name>: I may be in trouble! Here's my location: <location>. Please try to contact me at <phone number>!`
    },
    submitting: false,
    error: false,
    userLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    }
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

  sendSOSMessage = () => {
    this.setState({ submitting: true });
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
            message: {
              to: `5733303465`,
              body: `SOS FROM <user name>: I may be in trouble! Here's my location: <location>. Please try to contact me at <phone number>!`
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });
  }

  handleSOSPress = async () => {
    this.sendSOSMessage()
    try {
      const alarmSound = new Audio.Sound();
      await alarmSound.loadAsync(alarm);
      await alarmSound.playAsync();
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
    setTimeout(() => {Linking.openURL(`tel:7609099640`)}, 1000)
  }

  render() {
    return (
      <View style={styles.fullWidth}>
        <Button 
          buttonStyle={styles.sosButton}
          titleStyle={styles.sosText}
          onPress={this.handleSOSPress}
          raised
          title="SOS"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sosButton: {
    backgroundColor: 'red',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  sosText: {
    fontSize: 40,
    color: '#FFF',
  },
  fullWidth: {
    width: '100%',
  }
})

export default SosButton;