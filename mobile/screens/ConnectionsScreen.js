import React, { Component } from "react";
import { View, ScrollView, Text, AsyncStorage } from "react-native";
import getConnections from "../actions/Actions";

export default class ConnectionsScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    connections: []
  };

  getConnections = () => {
    const token = AsyncStorage.getItem("userToken")
    console.log(token)
    /* this.setState({
      connections: getConnections()
    }); */
  };

  componentDidMount() {
    this.getConnections();
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Connections</Text>
        {this.state.connections.map(contact => {
          <View>
            <Text>
              Name:{contact.FirstName} {contact.LastName}
            </Text>
            <Text>Phone Number: {contact.PhoneNumber}</Text>
          </View>;
        })}
      </ScrollView>
    );
  }
}
