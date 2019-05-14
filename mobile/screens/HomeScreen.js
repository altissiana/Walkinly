import React from "react";
import { View, StyleSheet } from "react-native";

import SimpleMap from '../components/Map';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        
        <SimpleMap />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});