import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AppLoading, Asset } from 'expo'
import Navigation from './navigation2/index'
/* import * as constants from './constants'
import { Block } from './components' */

/* const images = [
  //we're importing all images

  require('./assets/images/grady_1.jpg'),
  require('./assets/images/grady_2.jpg'),
  require('./assets/images/grady_3.jpg'),
  require('./assets/images/grady_4.jpeg'),
  require('./assets/images/grady_5.jpg'),
]; */

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