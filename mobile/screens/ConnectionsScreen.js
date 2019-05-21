import React, { Component } from "react";
import { 
  View, 
  ScrollView, 
  Text,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { connect } from 'react-redux';
import { getConnections } from '../actions/Actions';
import { brotliDecompress } from "zlib";

class ConnectionsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isMounted: false
  };

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => {
      this.getConnections()
    });
  }

  getConnections = async () => {
    if (this.state.isMounted) {
      try {
        getConnections(await AsyncStorage.getItem('userToken'))
      }
      catch (e) {
        throw new Error(e);
      }
    }
  };

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          fontSize: 24
        }}
      >
        <Text>Connections</Text>
        {this.props.connections 
          ? this.props.connections.map((contact, i) => {
              return (<View key={'contact' + i}>
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
  }
}

export default connect(mapStateToProps)(ConnectionsScreen)