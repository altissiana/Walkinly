import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements';
import validator from 'validator';
import * as firebase from 'firebase';

import { signin } from '../actions/Actions';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
        isMounted: false,
        isError: false,
        errorText: '',
        errors: []
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        })
    }

    handleLogin = async () => {
        const { navigation } = this.props
        const { email, password } = this.state

        Keyboard.dismiss()
        this.state.isMounted && this.setState({ loading: true })

        if (this.state.isMounted && validator.isEmail(email) && validator.isAscii(password)) {
          await AsyncStorage.removeItem('userPic')
            firebase
              .storage()
              .ref()
              .child('images/' + `${email}-profile-image`)
              .getDownloadURL()
              .then(async url => {
                if (url) {
                  await AsyncStorage.setItem('userPic', url)
                }
              })
              .catch(err => {
                console.log(err)
              })
            signin(email, password)
                .then(() => {
                    navigation.navigate('AuthLoading');
                })
                .catch(err => {
                    this.setState({
                        isError: true,
                        errorText: err
                    })
                });
        }
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        })
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

        return (

            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <Text style={{
                    color: 'white', fontSize: 40
                }}>Login</Text>

                <TextInput
                    label='Email'
                    placeholder='Email'
                    placeholderTextColor="#B0B0B0"
                    style={[styles.input, hasErrors('email')]}
                    autoCapitalize='none'
                    defaultValue={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='Password'
                    placeholder='Password'
                    placeholderTextColor="#B0B0B0"
                    style={[styles.input, hasErrors('password')]}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    defaultValue={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    style={styles.input}
                />

                <Button
                    type="outline"
                    title="Enter"
                    onPress={() => this.handleLogin()} style={{
                        marginTop: 40,
                        alignSelf: 'center',
                        shadowColor: "#cccfd8",
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                            height: 1,
                            width: 1
                        }
                    }}
                    buttonStyle={{
                        height: 50,
                        width: 150,
                        borderColor: 'white',
                        borderWidth: 2,
                    }}
                    titleStyle={{ color: 'white', fontSize: 20 }}
                />
                <Button
                    style={{ color: 'white', marginTop: 40 }}
                    titleStyle={{
                        color: 'white', fontSize: 20,
                        marginTop: 40,
                        alignSelf: 'center',
                        shadowColor: "#cccfd8",
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                            height: 1,
                            width: 1
                        }
                    }}
                    type='clear'
                    title='Forgot your password?'
                    onPress={() => this.props.navigation.navigate('Forgot')}>
                </Button>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 0,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: 'white',
        padding: 10,
        marginTop: 40,
        fontSize: 25,
        color: 'white',
        shadowColor: "#cccfd8",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },


});