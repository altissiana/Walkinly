import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.newView}>
          <Text>This is in a new view.</Text>
        </View>
        <View style={styles.newView}>
          <Text style={styles.text}>Hello, world!</Text>
          <Text style={styles.test}>This is a test!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Verdana',
  },
  test: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: 'blue',
  },
  newView: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'green',
  }
});
