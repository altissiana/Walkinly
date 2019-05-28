import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import * as firebase from 'firebase';
import { getConnections } from '../actions/Actions';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken) {
      const ref = firebase
        .storage()
        .ref()
        .child('images/' + `${userToken}-profile-image`)
        .getDownloadURL()
        .then(async url => {
          if (url) {
            await AsyncStorage.setItem('userPic', url)
          }
        })
        .catch(err => {
          console.log(err)
        })
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
