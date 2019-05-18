import React, { Component } from "react";
import { 
  View, 
  ScrollView, 
  Text, 
  AsyncStorage 
} from "react-native";
import { getConnections } from "../actions/Actions";

export default class ConnectionsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    connections: [],
    email: '',
    isMounted: false
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
    this.getToken().then(() => {
      this.getConnections();
    });
  }

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken')
      this.setState({
        email: token
      })
    } catch (e) {
      console.log("getToken Error: " + e);
      throw new Error(e);
    }
  }

  getConnections = async () => {
    if (this.state.isMounted) {
      await getConnections(this.state.email).then((data) => {
        this.setState({
          connections: data
        })
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Connections</Text>
        {this.state.connections 
          ? this.state.connections.map((contact, i) => {
              return (<View key={'contact' + i}>
                <Text>
                  Name:{contact.FirstName} {contact.LastName}
                </Text>
                <Text>Phone Number: {contact.PhoneNumber}</Text>
              </View>)
            })
          : <View></View>
        }
      </ScrollView>
    )
  }
}
