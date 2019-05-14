import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import LocalReportsScreen from '../screens/LocalReportsScreen';
import TipsScreen from '../screens/TipsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ConnectionsStack = createStackNavigator({
  Connections: ConnectionsScreen,
});

ConnectionsStack.navigationOptions = {
  tabBarLabel: 'Connections',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const UserSettingsStack = createStackNavigator({
  UserSettings: UserSettingsScreen,
});

UserSettingsStack.navigationOptions = {
  tabBarLabel: 'User Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const LocalReportsStack = createStackNavigator({
  LocalReports: LocalReportsScreen,
});

LocalReportsStack.navigationOptions = {
  tabBarLabel: 'Local Reports',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const TipsStack = createStackNavigator({
  Tips: TipsScreen,
});

TipsStack.navigationOptions = {
  tabBarLabel: 'Tips',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const UserProfileStack = createStackNavigator({
  UserProfile: UserProfileScreen,
});

UserProfileStack.navigationOptions = {
  tabBarLabel: 'User Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createMaterialTopTabNavigator({
  HomeStack,
  ConnectionsStack,
  UserSettingsStack,
  LocalReportsStack,
  TipsStack,
  UserProfileStack,
});