<<<<<<< HEAD
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AppLoading, Asset } from 'expo'
import Navigation from './navigation'
import * as constants from './constants'
import { Block } from './components'

const images = [
  //we're importing all images

  require('./assets/images/grady_1.jpg'),
  require('./assets/images/grady_2.jpg'),
  require('./assets/images/grady_3.jpg'),
  require('./assets/images/grady_4.jpeg'),
  require('./assets/images/grady_5.jpg'),
];

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
=======
import React from 'react';
import { Platform, StatusBar, Text, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
>>>>>>> 33b966e1ba5939a4357fca82ac6cb9581961d208

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
<<<<<<< HEAD
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Block white>
        <Navigation />
      </Block>
    );
=======
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <View style={styles.phoneInfoBar}></View>
          <AppNavigator />
        </View>
      );
    }
>>>>>>> 33b966e1ba5939a4357fca82ac6cb9581961d208
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
<<<<<<< HEAD
=======
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  phoneInfoBar: {
    backgroundColor: "#FFF",
    height: 20,
    width: "100%"
  },
>>>>>>> 33b966e1ba5939a4357fca82ac6cb9581961d208
});