import React, { Component } from "react";
import { View, Text } from "react-native";
import getConnections from "../actions/Actions";

export default class ConnectionsScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    connections: []
  };

  getConnections = () => {
    this.setState({
      connections: getConnections(AsyncStorage.getItem("userToken"))
    });
  };

  componentDidMount() {
    this.getConnections();
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
