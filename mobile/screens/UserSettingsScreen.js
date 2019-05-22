import React, { Component, useReducer } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, TextInput } from "react-native";
import { Button } from 'react-native-elements';
import { signout, changePassword } from "../actions/Actions";
import { connect } from "react-redux";

export default class UserSettingsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    isMounted: false,
    newPassword: ''
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
  }

  handleLogout = () => {
    const { navigation } = this.props;

    if (this.state.isMounted) {
      signout()
        .then(() => {
          navigation.navigate('AuthLoading');
        });
    }
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }


  onChangePasswordPress = () => {
    changePassword(this.state.newPassword).then(() => {
      Alert.alert('Password was changed');
    }).catch((error) => {
      throw new Error
    })
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/grady11.jpg')}
        style={styles.img}>
        <ScrollView>
          <Button
            style={{
              marginBottom: 100,
              shadowColor: "#fff",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
            buttonStyle={{
              height: 50,
              width: 250,
              backgroundColor: '#e2e4e9',
            }}
            titleStyle={{
              color: '#767689', fontSize: 20
            }}

            type='solid'
            title='Logout'
            onPress={() => this.handleLogout()}
          />


          <TextInput style={styles.input}
            value={this.state.newPassword}
            placeholder='New Password'
            placeholderTextColor="#FFFFFF"
            autoCapitalize='none'
            // secureTextEntry={true}? find out how to make this work later!
            onChangeText={(text) => { this.setState({ newPassword: text }) }}
          />

          <Button
            title='Change Password'
            type='solid'
            onPress={this.onChangePasswordPress}
            style={{
              marginBottom: 20,
              shadowColor: "#fff",

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
            buttonStyle={{
              height: 50,
              width: 250,
              backgroundColor: '#e2e4e9',
            }}
            titleStyle={{ color: '#767689', fontSize: 20 }}
          />


        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32
  },
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderBottomColor: 'white',
    padding: 10,
    marginTop: 40,
    marginBottom: 80,
    fontSize: 20,
    color: 'white',
    shadowColor: "#cccfd8",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
})