import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import ConnectionsScreen from '../screens/ConnectionsScreen';
import TipsScreen from '../screens/TipsScreen';
import NewConnectionScreen from "../screens/NewConnectionScreen";
import EditConnectionScreen from '../screens/EditConnectionScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: () => {return (<Ionicons size={ 20 } name={ 'ios-map' } color={ 'white' }/>)}
};

const ConnectionsStack = createStackNavigator({
  Connections: ConnectionsScreen,
  NewConnection: NewConnectionScreen,
  EditConnection: EditConnectionScreen
});

ConnectionsStack.navigationOptions = {
  tabBarLabel: 'Connections',
  tabBarIcon: () => {return (<Ionicons size={ 20 } name={ 'ios-people' } color={ 'white' }/>)}
};

const UserSettingsStack = createStackNavigator({
  UserSettings: UserSettingsScreen
});

UserSettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: () => {return (<Ionicons size={ 20 } name={ 'ios-settings' } color={ 'white' }/>)}
};

const TipsStack = createStackNavigator({
  Tips: TipsScreen
});

TipsStack.navigationOptions = {
  tabBarLabel: "Tips",
  tabBarIcon: () => {return (<Ionicons size={ 20 } name={ 'ios-information-circle' } color={ 'white' }/>)}
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    ConnectionsStack,
    UserSettingsStack,
    TipsStack,
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 9
      },
      indicatorStyle: {
        backgroundColor: "red",
        height: 3
      },
      style: {
        backgroundColor: "rgba(0,0,0,1)"
      },
      showIcon: true,
      showLabel: true
    }
  }
);
