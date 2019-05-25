import React from "react";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import { AsyncStorage } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import UserSettingsScreen from "../screens/UserSettingsScreen";
import ConnectionsScreen from "../screens/ConnectionsScreen";
import LocalReportsScreen from "../screens/LocalReportsScreen";
import TipsScreen from "../screens/TipsScreen";
import NewConnectionScreen from "../screens/NewConnectionScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home"
};

const ConnectionsStack = createStackNavigator({
  Connections: ConnectionsScreen,
  NewConnection: NewConnectionScreen
});

ConnectionsStack.navigationOptions = {
  tabBarLabel: "Friends & Family"
  /* tabBarOnPress: async (scene, jumpToIndex) => { 
    getConnections(await AsyncStorage.getItem('userToken'));
  } */
};

const UserSettingsStack = createStackNavigator({
  UserSettings: UserSettingsScreen
});

UserSettingsStack.navigationOptions = {
  tabBarLabel: "User Settings"
};

const LocalReportsStack = createStackNavigator({
  LocalReports: LocalReportsScreen
});

LocalReportsStack.navigationOptions = {
  tabBarLabel: "Local Reports"
};

const TipsStack = createStackNavigator({
  Tips: TipsScreen
});

TipsStack.navigationOptions = {
  tabBarLabel: "Tips"
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    ConnectionsStack,
    UserSettingsStack,
    LocalReportsStack,
    TipsStack
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 10
      },
      indicatorStyle: {
        backgroundColor: "red",
        height: 3
      },
      style: {
        backgroundColor: "rgba(0,0,0,.9)"
      }
    }
  }
);
