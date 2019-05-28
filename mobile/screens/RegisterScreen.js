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
import { register } from '../actions/Actions';
import * as firebase from 'firebase';
import validator from 'validator';

export default class Register extends Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        loading: false,
        isMounted: false
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
    }

    uploadImageAsync = async (uri, imageName) => {
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

        blob.close();

        return await snapshot.ref.getDownloadURL();
    }

    createProfilePic = (email) => {
        return new Promise(async (resolve, reject) => {
            let uploadURL = await this.uploadImageAsync('http://chittagongit.com/images/default-profile-icon/default-profile-icon-24.jpg', `${email}-profile-image`)
            await AsyncStorage.removeItem('userPic')
            await AsyncStorage.setItem('userPic', uploadURL)
            resolve()
        })
            .catch(error => {
                console.log(error)
            })
    }

    handleRegister = async () => {
        const { navigation } = this.props;
        const { firstname, lastname, email, phonenumber, password } = this.state;

        Keyboard.dismiss();
        this.state.isMounted && this.setState({ loading: true });

        if (this.state.isMounted && validator.isEmail(email) && validator.isNumeric(phonenumber) && validator.isAscii(password) && validator.isAlpha(firstname) && validator.isAlpha(lastname)) {
            await this.createProfilePic(email)
            register(email, password, phonenumber, firstname, lastname)
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
        });
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;

        return (

            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <Text style={{
                    color: 'white', fontSize: 40
                }}>Register</Text>
                <TextInput
                    label='FirstName'
                    placeholder='First Name'
                    placeholderTextColor="#B0B0B0"
                    style={styles.input}
                    defaultValue={this.state.firstname}
                    onChangeText={text => this.setState({ firstname: text })}
                    style={styles.input}
                />
                <TextInput
                    label='LastName'
                    placeholder='Last Name'
                    placeholderTextColor="#B0B0B0"
                    style={styles.input}
                    defaultValue={this.state.lastname}
                    onChangeText={text => this.setState({ lastname: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='Email'
                    placeholder='Email'
                    placeholderTextColor="#B0B0B0"
                    style={styles.input}
                    autoCapitalize='none'
                    defaultValue={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='PhoneNumber'
                    placeholder='Phone Number'
                    placeholderTextColor="#B0B0B0"
                    style={styles.input}
                    defaultValue={this.state.phonenumber}
                    onChangeText={text => this.setState({ phonenumber: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='Password'
                    placeholder='Password'
                    placeholderTextColor="#B0B0B0"
                    style={styles.input}
                    autoCapitalize='none'
                    defaultValue={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    style={styles.input}
                />
                <Button
                    type="outline"
                    title="Enter"
                    onPress={() => this.handleRegister()}
                    style={{

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
            </View>

        )
    }
}

const styles = StyleSheet.create({

    input: {
        borderRadius: 0,
        borderWidth: 2,
        borderColor: 'transparent',
        borderBottomColor: '#6a7189',
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
    butts: {
        marginTop: 20,
        marginBottom: 80
    },

});