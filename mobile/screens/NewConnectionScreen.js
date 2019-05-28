import React, { Component } from "react";
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { newConnection } from "../actions/Actions";
import validator from 'validator';

class NewConnectionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      height: 40,
      backgroundColor: "dodgerblue"
    },
    headerTitle: "Add Connection",
    headerTitleStyle: {
      fontSize: 32,
      color: "white"
    },
    headerTitleContainerStyle: {
      top: -16
    }
  });

  state = {
    FirstName: "",
    LastName: "",
    PhoneNumber: ""
  };

  saveConnection = async () => {
    await AsyncStorage.getItem("userToken").then(email => {
      if (validator.isNumeric(this.state.PhoneNumber) && validator.isAlpha(this.state.FirstName) && validator.isAlpha(this.state.LastName)) {
        newConnection(
          email,
          this.state.PhoneNumber,
          this.state.FirstName,
          this.state.LastName
        )
        .then(() => {
          this.props.navigation.navigate("AuthLoading");
        })
      }
    });
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.text}
          title="FirstName"
          placeholder="First Name"
          defaultValue={this.state.FirstName}
          onChangeText={text => {
            this.setState({ FirstName: text });
          }}
        />
        <TextInput
          style={styles.text}
          title="LastName"
          placeholder="Last Name"
          defaultValue={this.state.LastName}
          onChangeText={text => {
            this.setState({ LastName: text });
          }}
        />
        <TextInput
          style={styles.text}
          title="PhoneNumber"
          placeholder="Phone Number"
          defaultValue={this.state.PhoneNumber}
          onChangeText={text => {
            this.setState({ PhoneNumber: text });
          }}
        />
        <View style={[{ width: "50%", marginLeft: 95 }]}>
          <Button
            title="Save"
            style={styles.saveButton}
            onPress={() => {
              this.saveConnection();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 6,
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    marginLeft: 15
  },
  viewStyle: {
    paddingTop: 50
  },
  saveButton: {
    width: 40
  }
});

export default NewConnectionScreen;
