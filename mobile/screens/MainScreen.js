import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import MainTabNavigator from '../navigation/MainTabNavigator';
import SosButton from '../components/SosButton';

export default class MainScreen extends Component {
  static router = MainTabNavigator.router;

  render() {
    return (
      <View style={styles.container}>
        <MainTabNavigator navigation={this.props.navigation} />
        <SosButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});