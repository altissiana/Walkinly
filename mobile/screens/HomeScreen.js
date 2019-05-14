import React from "react";
import { View } from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.phoneInfoBar}></View>
        
        <SimpleMap />
        
        <SosButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  phoneInfoBar: {
    backgroundColor: "#FFF",
    height: 20,
    width: "100%"
  },
});