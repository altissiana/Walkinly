import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import LoginNavigator from './LoginNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginNavigator,
    Main: MainScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));