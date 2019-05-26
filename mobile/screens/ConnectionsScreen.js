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
import { getConnections, deleteConnection } from "../actions/Actions";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

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
    isMounted: false,
    accepted: false
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

  deleteConnection = async (phonenumber) => {
    await AsyncStorage.getItem('userToken').then(email => {
      deleteConnection(email, phonenumber)
    })
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.alignAndJustCenter}
        style={styles.contentContainer}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            this.setState({
              accepted: true
            })
          }
        }}
        scrollEventThrottle={32}
      >
        <Button
          title="Add Connection"
          onPress={() => {
            this.addConnection();
          }}
        />
        {this.props.connections 
          && this.props.connections.map((contact, i) => {
              return (
              <View 
                key={'contact' + i} 
                style={styles.connection}
              >
                <Text>
                  <Text style={styles.bold}>Name:</Text> {contact.FirstName} {contact.LastName}
                </Text>
                <Text>
                  <Text style={styles.bold}>Phone Number:</Text> {contact.PhoneNumber}
                </Text>
                <Text 
                  style={styles.deleteConnection}
                  onPress={() => {
                    this.deleteConnection(contact.PhoneNumber);
                    this.props.navigation.navigate("AuthLoading");
                  }}
                >
                  X
                </Text>
              </View>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  alignAndJustCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  connection: {
    width: '90%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(210, 210, 210)',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  container:{
    flex: 1,
    fontSize: 24
  },
  deleteConnection: {
    fontSize: 20,
    padding: 14,
    color: 'red',
    position: 'absolute',
    right: 0
  }
})

function mapStateToProps(appState, ownProps) {
  return {
    ...ownProps,
    connections: appState.connections
  };
}

export default connect(mapStateToProps)(ConnectionsScreen);
