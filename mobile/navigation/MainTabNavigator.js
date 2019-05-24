import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import LocalReportsScreen from '../screens/LocalReportsScreen';
import TipsScreen from '../screens/TipsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
};

const ConnectionsStack = createStackNavigator({
  Connections: ConnectionsScreen,
});

ConnectionsStack.navigationOptions = {
  tabBarLabel: 'Friends & Family',
};

const UserSettingsStack = createStackNavigator({
  UserSettings: UserSettingsScreen,
});

UserSettingsStack.navigationOptions = {
  tabBarLabel: 'User Settings',
};

const LocalReportsStack = createStackNavigator({
  LocalReports: LocalReportsScreen,
});

LocalReportsStack.navigationOptions = {
  tabBarLabel: 'Local Reports',
};

const TipsStack = createStackNavigator({
  Tips: TipsScreen,
});

TipsStack.navigationOptions = {
  tabBarLabel: 'Tips',
};

export default createMaterialTopTabNavigator({
  HomeStack,
  ConnectionsStack,
  UserSettingsStack,
  LocalReportsStack,
  TipsStack,
},
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 10,
      },
      indicatorStyle: {
        backgroundColor: 'dodgerblue',
        height: 3,
      },
      style: {
        backgroundColor: 'rgba(0,0,0,.9)'
      },
    }
  })
