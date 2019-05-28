import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Linking,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { getConnections, deleteConnection } from "../actions/Actions";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class ConnectionsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 40,
      backgroundColor: 'black',
      zIndex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24,
    },
    headerTitle: "Connections",
    headerTitleStyle: {
      fontSize: 30,
      color: 'white',
      fontFamily: 'Arial'
    },
    headerTitleContainerStyle: {
      top: -16
    }
  }

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
        console.log(e);
      }
    }
  };

  addConnection() {
    this.props.navigation.navigate("NewConnection");
  }

  deleteConnection = async phonenumber => {
    if (this.state.isMounted) {
      await AsyncStorage.getItem("userToken").then(email => {
        deleteConnection(email, phonenumber).then(() => {
          this.props.navigation.navigate("AuthLoading");
        });
      });
    }
  };

  editConnection = async (phonenumber, firstname, lastname) => {
    if (this.state.isMounted) {
      await AsyncStorage.setItem("tempConnPhone", phonenumber)
        .then(async () => {
          await AsyncStorage.setItem("tempConnFirst", firstname);
        })
        .then(async () => {
          await AsyncStorage.setItem("tempConnLast", lastname);
        })
        .then(() => {
          this.props.navigation.navigate("EditConnection");
        })
        .catch(error => {
          console.log(error);
        });
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
        contentContainerStyle={styles.alignAndJustCenter}
        style={styles.contentContainer}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            this.setState({
              accepted: true
            });
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
            if (contact.FirstName !== null && contact.LastName !== null && contact.PhoneNumber !== null) {
              return (
                <TouchableOpacity
                  key={'contact' + i}
                  style={styles.connection}
                  onPress={() => {
                    Alert.alert(
                      `${contact.FirstName} ${contact.LastName}`,
                      'Would you like to edit or call this connection?',
                      [
                        {
                          text: 'Call',
                          onPress: () => {
                            Linking.openURL(`tel:${contact.PhoneNumber}`)
                          }
                        },
                        {
                          text: 'Edit',
                          onPress: () => {
                            this.editConnection(contact.PhoneNumber, contact.FirstName, contact.LastName);
                          }
                        },
                        {
                          text: 'Delete',
                          onPress: () => {
                            this.deleteConnection(contact.PhoneNumber);
                          }
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancelled'),
                          style: 'cancel',
                        },
                      ],
                      { cancelable: false }
                    )
                  }}
                >

                  <View>

                    <Text>
                      <Text style={styles.bold}>Name:</Text> {contact.FirstName} {contact.LastName}
                    </Text>

                    <Text>
                      <Text style={styles.bold}>Phone Number:</Text> {contact.PhoneNumber}
                    </Text>

                  </View>

                </TouchableOpacity>
              )
            }
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  alignAndJustCenter: {
    alignItems: "center",
    justifyContent: "center"
  },
  connection: {
    width: "90%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(210, 210, 210)",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  bold: {
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    fontSize: 24
  },
  deleteConnection: {
    fontSize: 20,
    padding: 14,
    color: "red",
    position: "absolute",
    right: 0
  }
});

function mapStateToProps(appState, ownProps) {
  return {
    ...ownProps,
    connections: appState.connections
  };
}

export default connect(mapStateToProps)(ConnectionsScreen);
