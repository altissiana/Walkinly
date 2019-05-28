<<<<<<< HEAD
import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import * as firebase from "firebase";
import { getConnections } from "../actions/Actions";
=======
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { getConnections } from '../actions/Actions';
>>>>>>> 5796bdf159c348c59180bf15d7033b848da6394f

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to appropriate place
  _bootstrapAsync = async () => {
<<<<<<< HEAD
    // await AsyncStorage.setItem('userToken', 'Tissi')  //delete this after
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
      if (!(await AsyncStorage.getItem("userPic"))) {
        const ref = firebase
          .storage()
          .ref()
          .child("images/" + `${userToken}-profile-image`)
          .getDownloadURL()
          .then(async url => {
            if (url) {
              await AsyncStorage.setItem("userPic", url);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      await getConnections(userToken);
=======
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken) {
      await getConnections(userToken)
>>>>>>> 5796bdf159c348c59180bf15d7033b848da6394f
    }
    this.props.navigation.navigate(userToken ? "Main" : "Login");
  };

  // Render loading content
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
