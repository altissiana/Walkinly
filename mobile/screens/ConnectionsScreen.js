import React, { Component } from "react";
import { View, Text } from "react-native";

export default class ConnectionsScreen extends Component {
  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Connections Screen</Text>
      </View>
    );
  }
}