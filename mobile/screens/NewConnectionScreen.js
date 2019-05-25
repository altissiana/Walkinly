import React, { Component } from "react";
import { TextInput, View, Button, StyleSheet, Text, Alert } from "react-native";
class NewConnectionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      height: 40
    },
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

  saveConnection() {
    this.setState({
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      PhoneNumber: this.state.PhoneNumber
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.text}
          title="FirstName"
          placeholder="First Name"
        />
        <TextInput
          style={styles.text}
          title="LastName"
          placeholder="Last Name"
        />
        <TextInput
          style={styles.text}
          title="PhoneNumber"
          placeholder="Phone Number"
        />
        <Button
          title="Fuckin Save"
          style={styles.saveButton}
          onPress={() => {
            this.saveConnection();
          }}
        />
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
    width: 100
  }
});

export default NewConnectionScreen;
