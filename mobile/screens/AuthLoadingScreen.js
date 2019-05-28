import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { getConnections } from '../actions/Actions';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to appropriate place
  _bootstrapAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'Tissi')  //delete this after
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken) {
      await getConnections(userToken)
    }
    this.props.navigation.navigate(userToken ? 'Main' : 'Login')
  };

  // Render loading content
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}
