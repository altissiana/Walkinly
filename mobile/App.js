import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends React.Component {
  state = {
    
  }

  handlePress = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phoneInfoBar}></View>
        <View style={styles.centerContent}>
          <Text>Map</Text>
        </View>
        <Button
          buttonStyle={styles.sosButton}
          titleStyle={styles.sosText}
          onPress={this.handlePress}
          raised
          title="SOS"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInfoBar: {
    backgroundColor: '#FFF',
    height: 20,
    width: '100%',
  },
  centerContent: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButton: {
    backgroundColor: 'red',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  sosCircle: {
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 50,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosText: {
    fontSize: 40,
    color: '#FFF',
  }
});