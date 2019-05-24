import React, { Component } from 'react';
import { Audio } from 'expo';
import { StyleSheet, View, Linking, NativeModules } from 'react-native';
import { Button } from 'react-native-elements';
import alarm from '../assets/sounds/alarm.mp3';

const { Torch } = NativeModules;

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
    },
    alarmSound: new Audio.Sound(),
    statusSOS: false,
    labelSOS: 'SOS',
    clickableSOS: true
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
    if (this.state.clickableSOS) {
      this.setState({
        clickableSOS: false
      })
      if (!this.state.statusSOS) {
        this.setState({
          labelSOS: 'STOP'
        })
        /* this.sendSOSMessage() */
        try {
          await this.state.alarmSound.loadAsync(alarm);
          await this.state.alarmSound.playAsync();
          await this.state.alarmSound.setIsLoopingAsync(true);
          await Torch.switchState(true)
        } catch (e) {
            console.log(`cannot play the sound file or cannot turn on flashlight`, e);
        }
        /* setTimeout(() => {Linking.openURL(`tel:7609099640`)}, 1000) */
      } else {
        this.setState({
          labelSOS: 'SOS'
        })
        try {
          await this.state.alarmSound.setIsLoopingAsync(false)
          await this.state.alarmSound.stopAsync();
          await this.state.alarmSound.unloadAsync();
          await Torch.switchState(false)
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
    }, 5000)
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