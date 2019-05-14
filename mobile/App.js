import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AppLoading, Asset } from 'expo'
import Navigation from './navigation2/index'


export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  handleResourcesAsync = async () => {
    //we're caching all the images for better performance  
    const cacheImages = images.map(img => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  render() {
    return (
      <Navigation />
    );
  }
}