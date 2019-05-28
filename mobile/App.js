import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Provider } from 'react-redux';
import store from './store';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar hidden barStyle="default" />}
            <AppNavigator /> 
          </View>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/grady1.jpg'),
        require('./assets/grady2.jpg'),
        require('./assets/grady3.jpg'),
        require('./assets/grady4.jpeg'),
        require('./assets/grady5.jpg'),
        require('./assets/grady6.png'),
        require('./assets/grady7.jpg'),
        require('./assets/grady8.jpg'),
        require('./assets/grady9.jpg'),
        require('./assets/grady10.jpg'),
        require('./assets/grady11.jpg'),

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

    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  phoneInfoBar: {
    backgroundColor: "#FFF",
    height: 20,
    width: "100%"
  },
});