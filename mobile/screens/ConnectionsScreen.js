import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { getConnections } from "../actions/Actions";

class ConnectionsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isMounted: false
  };

  componentDidMount() {
    this.setState(
      {
        isMounted: true
      },
      () => {
        this.getConnections();
      }
    );
  }

  getConnections = async () => {
    if (this.state.isMounted) {
      try {
        getConnections(await AsyncStorage.getItem("userToken"));
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  addConnection() {
    this.props.navigation.navigate("NewConnection");
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24
        }}
      >
        <Text>Connections</Text>
        <Button
          title="Add Connection"
          onPress={() => {
            this.addConnection();
          }}
        />
        {this.props.connections ? (
          this.props.connections.map((contact, i) => {
            return (
              <View key={"contact" + i}>
                <Text>
                  Name:{contact.FirstName} {contact.LastName}
                </Text>
                <Text>Phone Number: {contact.PhoneNumber}</Text>
              </View>
            );
          })
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(appState, ownProps) {
  return {
    ...ownProps,
    connections: appState.connections
  };
}

export default connect(mapStateToProps)(ConnectionsScreen);
