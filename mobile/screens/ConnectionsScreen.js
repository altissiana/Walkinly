import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
  ImageBackground
} from "react-native";
import { Button } from "react-native-elements";
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
      borderTopWidth: 2,
      borderColor: "gray",
      backgroundColor: "black",
      zIndex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24
    },
    headerTitle: "Connections",
    headerTitleStyle: {
      fontSize: 30,
      color: "white",
      fontFamily: "Arial"
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
<<<<<<< HEAD
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
        <View
          style={{
            borderRadius: 5,
            backgroundColor: "black",
            marginTop: 30,
            height: 50,
            width: 250,
            fontSize: 20,
            marginBottom: 30
          }}
        >
          <Button
            style={{
              marginBottom: 100,
              shadowColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6
            }}
            buttonStyle={{
              height: 50,
              width: 250,
              marginLeft: 10,
              backgroundColor: "black"
            }}
            titleStyle={{
              color: "gray",
              fontSize: 20
            }}
            type="solid"
            title="Add Connection"
            onPress={() => {
              this.addConnection();
            }}
          />
        </View>

        {this.props.connections &&
          this.props.connections.map((contact, i) => {
            if (
              contact.FirstName !== null &&
              contact.LastName !== null &&
              contact.PhoneNumber !== null
            ) {
              return (
                <TouchableOpacity
                  key={"contact" + i}
                  style={styles.connection}
                  onPress={() => {
                    Alert.alert(
                      `${contact.FirstName} ${contact.LastName}`,
                      "Would you like to edit or call this connection?",
                      [
                        {
                          text: "Call",
                          onPress: () => {
                            Linking.openURL(`tel:${contact.PhoneNumber}`);
                          }
                        },
                        {
                          text: "Edit",
                          onPress: () => {
                            this.editConnection(
                              contact.PhoneNumber,
                              contact.FirstName,
                              contact.LastName
                            );
                          }
                        },
                        {
                          text: "Delete",
                          onPress: () => {
                            this.deleteConnection(contact.PhoneNumber);
                          }
                        },
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancelled"),
                          style: "cancel"
                        }
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <View>
                    <Text>
                      <Text style={styles.bold}>Name:</Text> {contact.FirstName}{" "}
                      {contact.LastName}
                    </Text>

                    <Text>
                      <Text style={styles.bold}>Phone Number:</Text>{" "}
                      {contact.PhoneNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
      </ScrollView>
=======
      <View style={{ backgroundColor: '#F0F0F0', flex: 1 }}>
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
      </View>
>>>>>>> 5796bdf159c348c59180bf15d7033b848da6394f
    );
  }
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  addButton: {
    borderWidth: 2,
    borderColor: "black"
  },

  img: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
=======
>>>>>>> 5796bdf159c348c59180bf15d7033b848da6394f
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
