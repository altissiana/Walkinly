import React, { Component, useReducer } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, TextInput, Image, Alert, TouchableOpacity, AsyncStorage } from "react-native";
import { Button, Avatar } from 'react-native-elements';
import { signout, changePassword } from "../actions/Actions";
import { connect } from "react-redux";
import { Permissions, Camera, ImagePicker, AppLoading, Constants } from 'expo';
import { launchCamera, launchImageLibrary } from '../actions/Actions';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: 'walkinly.appspot.com',
  messagingSenderId: '',
};

firebase.initializeApp(firebaseConfig);

export default class UserSettingsScreen extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoadingComplete: false
  //   }

  //   if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig) }
  //   // super()
  //   // this.askPermission = this.askPermission.bind(this)
  // }

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
    image: null,
    uploading: false
  }

  async componentDidMount() {
    // this.askPermission()
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      image: {
        uri: await AsyncStorage.getItem('userPic')
      }
    })
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

  uploadImageAsync = async (uri, imageName) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child('images/' + imageName);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }


  onChangePasswordPress = () => {
    changePassword(this.state.email, this.state.newPassword).then(() => {
      Alert.alert('Password was changed');
    }).catch((error) => {
      console.log(error)
    })
  }

  onChooseImagePress = async () => {
    const options = {
      allowsEditing: true,
      aspect: [4, 3]
    };
    let result = await ImagePicker.launchCameraAsync(options);
    let email = await AsyncStorage.getItem('userToken');

    if (!result.cancelled) {
      let uploadURL = await this.uploadImageAsync(result.uri, `${email}-profile-image`)
      await AsyncStorage.setItem('userPic', uploadURL)
      Alert.alert(
        'Image successfully uploaded!',
        '',
        [
          {
            text: 'Ok',
          }
        ],
        { cancelable: false }
      )
      this.props.navigation.navigate('AuthLoading')
    }
  }

  // uploadImage = (uri, imageName) => {
  //   return new Promise(async (resolve, reject) => {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();

  //     var ref = firebase.storage().ref().child()
  //     resolve(ref.put(blob))
  //   })
  // }

  /* launchCamera = () => {
    if (this.state.hasCameraPermission) {
      return new Promise((resolve, reject) => {
        launchCamera().then(source => {
          this.setState({
            avatarSource: source
          })
        }).catch(err => {
          console.log('camera error', err)
        })
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

  onChooseImagePress = () => {
    Alert.alert(
      'Profile Picture',
      'Would you like to change your pic?',
      [
        {
          text: 'Camera',
          onPress: async () => {
            await this.launchCamera()
              .then((source) => {
                this.setState({
                  avatarSource: source
                })
                this.props.navigation.navigate('AuthLoading')
              })
              .catch(error => {
                console.log(error)
              })
          }
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
  } */

  render() {
    let { image } = this.state;

    return (
      <ImageBackground
        source={require('../assets/grady2.jpg')}
        style={styles.img}>
        <ScrollView>

          {/* <Button style={styles.uploadAvatar}
      //     title='Choose image...' onPress={this.onChooseImagePress}
      //   /> */}

          <TouchableOpacity
            onPress={() => this.onChooseImagePress()}
          >
            {this.state.image &&
              <Image
                source={this.state.image}
                style={styles.uploadAvatar}
              />
            }
          </TouchableOpacity>

          {/* //  onPress={() => { this.handleChoosePhoto() }}>
      //   //     <Image
      //   //     source={this.state.avatarSource} 
      //   //    style={styles.uploadAvatar}
      //   //  /> */}

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
        </ScrollView >
      </ImageBackground >

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