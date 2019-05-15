import React, { Component } from 'react';
import { Audio } from 'expo';
import { StyleSheet, View, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import alarm from '../assets/sounds/alarm.mp3'

Audio.setIsEnabledAsync(true)

class SosButton extends Component {
  getSMSDivider = (string) => {
    return Platform.OS === "ios" ? "&" : "?";
  }

  handlePress = async () => {
    /* Linking.openURL(`sms:7609099640&body=Hello`) */
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
          onPress={this.handlePress.bind(this)}
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