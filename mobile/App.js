import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SosButton from './components/SosButton';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phoneInfoBar}></View>
        <View style={styles.centerContent}>
          <Text>Map</Text>
        </View>
        <SosButton />
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
});