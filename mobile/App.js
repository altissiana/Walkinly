import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    bool: true
  }

  handlePress = () => {
    if (bool) {
      this.setState({
        bool: false
      })
    } else {
      this.setState({
        bool: true
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phoneInfoBar}></View>
        <View style={styles.centerContent}>
          <Text>Map</Text>
        </View>
        {/* <View>
          <Button
            style={styles.sosButton}
            onPress={this.handlePress}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View> */}
        <View 
          style={styles.sosButton}
          onPress={this.handlePress}
        >
          <View style={styles.sosCircle}>
            <Text style={styles.sosText}>SOS</Text>
          </View>
        </View>
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