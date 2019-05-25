import React, { Component, useReducer } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, TextInput, Image, Alert, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import { signout, changePassword } from "../actions/Actions";
import { connect } from "react-redux";
import { Permissions, Camera, ImagePicker } from 'expo';
import { launchCamera, launchImageLibrary } from '../actions/Actions';


export default class UserSettingsScreen extends Component {
  constructor() {
    super()
    this.askPermission = this.askPermission.bind(this)
  }
  static navigationOptions = {
    header: null
  }

  state = {
    isMounted: false,
    password: "",
    oldPassword: "",
    isChanging: false,
    confirmPassword: "",
    newPassword: '',
    email: "",
    avatarSource: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,

  }


  componentDidMount() {
    this.askPermission()
  }

  async askPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    this.setState({
      isMounted: true,
      hasCameraPermission: status === 'granted'
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
    changePassword(this.state.email, this.state.newPassword).then(() => {
      Alert.alert('Password was changed');
    }).catch((error) => {
      console.log(error)
    })
  }

  launchCamera = () => {
    if (this.state.hasCameraPermission) {
      launchCamera().then(source => {
        this.setState({
          avatarSource: source
        })
      }).catch(err => {
        console.log('camera error', err)
      })
    }
  }

  launchImageLibrary = () => {
    if (this.state.hasCameraPermission) {
      launchImageLibrary().then(source => {
        this.setState({
          avatarSource: source
        })
      }).catch(err => {
        console.log('camera error', err)
      })
    }
  }

  handleChoosePhoto = () => {

    Alert.alert(
      'Profile Picture',
      'Would you like to change your pic?',
      [
        {
          text: 'Camera',
          onPress: () => { this.launchCamera() }
        },
        {
          text: 'Library',
          onPress: () => { this.launchImageLibrary() }

        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        }
      ]
    );
  }

  render() {
    const { image } = this.state;

    return (
      <ImageBackground
        source={require('../assets/grady11.jpg')}
        style={styles.img}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => { this.handleChoosePhoto() }}>
            <Image
              /* source={{ uri: image }} */
              source={this.state.avatarSource}
              style={styles.uploadAvatar}
            />
          </TouchableOpacity>

          <TextInput style={styles.input}
            value={this.state.email}
            placeholder='Enter your email'
            placeholderTextColor="#FFFFFF"
            autoCapitalize='none'
            onChangeText={(text) => { this.setState({ email: text }) }}
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
    marginTop: 500,
    fontSize: 20,
    color: 'white',
    shadowColor: "#cccfd8",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  uploadAvatar: {
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 300,
    borderRadius: 100,
    height: 200,
    width: 200
  }
})