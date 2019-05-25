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

class ConnectionsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 40,
      backgroundColor: 'dodgerblue'
    },
    headerTitle: "Connections",
    headerTitleStyle: {
      fontSize: 32,
      color: 'white'
    },
    headerTitleContainerStyle: {
      top: -16
    }
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
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontSize: 24
        }}
      >
        {this.props.connections 
          ? this.props.connections.map((contact, i) => {
              return (
              <View 
                key={'contact' + i} 
                style={styles.connection}
              >
                <Text>
                  <Text style={styles.connAttribute}>Name:</Text> {contact.FirstName} {contact.LastName}
                </Text>
                <Text>
                  <Text style={styles.connAttribute}>Phone Number:</Text> {contact.PhoneNumber}
                </Text>
              </View>
            );
          })
          : (<View />)
         }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  connection: {
    width: '90%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(210, 210, 210)',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  connAttribute: {
    fontWeight: 'bold'
  }
})

function mapStateToProps(appState, ownProps) {
  return {
    ...ownProps,
    connections: appState.connections
  }
}

export default connect(mapStateToProps)(ConnectionsScreen)