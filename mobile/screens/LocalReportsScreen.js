import React from "react";
import { View, Text } from "react-native";

export default class LocalReportsScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Local Reports Screen</Text>
      </View>
    );
  }
}