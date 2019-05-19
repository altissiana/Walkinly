import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage,
    ImageBackground,

} from 'react-native';
import { Button } from 'react-native-elements';

const VALID_FIRSTNAME = '';
const VALID_LASTNAME = '';
const VALID_EMAIL = '';
const VALID_PHONENUMBER = '';
const VALID_PASSWORD = '';


export default class Register extends Component {
    state = {
        firstname: VALID_FIRSTNAME,
        lastname: VALID_LASTNAME,
        email: VALID_EMAIL,
        phonenumber: VALID_PHONENUMBER,
        password: VALID_PASSWORD,
        errors: [],
        loading: false,
        isMounted: false
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
    }

    storeToken = async () => {
        try {
            await AsyncStorage.setItem('userToken', this.state.email);
        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }

    handleRegister = async () => {
        const { navigation } = this.props;
        const { firstname, lastname, email, phonenumber, password } = this.state;
        const errors = [];

        Keyboard.dismiss();
        this.state.isMounted && this.setState({ loading: true });

        this.storeToken();
        navigation.navigate('Main');
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

        return (
            <ImageBackground
                source={require('../assets/grady7.jpg')}
                style={styles.img}>
                <View>
                    <Text style={{
                        color: '#6a7189', fontSize: 40
                    }}>Register</Text>
                    <TextInput
                        label='FirstName'
                        placeholder='First Name'
                        placeholderTextColor="#FFFFFF"
                        style={[styles.input, hasErrors('firstname')]}
                        defaultValue={this.state.firstname}
                        onChangeText={text => this.setState({ firstname: text })}
                        style={styles.input}
                    />
                    <TextInput
                        label='LastName'
                        placeholder='Last Name'
                        placeholderTextColor="#FFFFFF"
                        style={[styles.input, hasErrors('lastname')]}
                        defaultValue={this.state.lastname}
                        onChangeText={text => this.setState({ lastname: text })}
                        style={styles.input}
                    />
                    <TextInput
                        secure
                        label='Email'
                        placeholder='Email'
                        placeholderTextColor="#FFFFFF"
                        style={[styles.input, hasErrors('email')]}
                        defaultValue={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                        style={styles.input}
                    />
                    <TextInput
                        secure
                        label='PhoneNumber'
                        placeholder='Phone Number'
                        placeholderTextColor="#FFFFFF"
                        style={[styles.input, hasErrors('phonenumber')]}
                        defaultValue={this.state.phonenumber}
                        onChangeText={text => this.setState({ phonenumber: text })}
                        style={styles.input}
                    />
                    <TextInput
                        secure
                        label='Password'
                        placeholder='Password'
                        placeholderTextColor="#FFFFFF"
                        style={[styles.input, hasErrors('password')]}
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
            </ImageBackground>
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
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});