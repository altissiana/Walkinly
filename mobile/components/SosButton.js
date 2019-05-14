import React, { Component } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Button } from 'react-native-elements';

class SosButton extends Component {
  handlePress = () => {
    Linking.openURL(`tel:5733303465`)
  }

  render() {
    return (
      <View style={styles.fullWidth}>
        <Button 
          buttonStyle={styles.sosButton}
          titleStyle={styles.sosText}
          onPress={this.handlePress}
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