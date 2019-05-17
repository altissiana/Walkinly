import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements'

const VALID_USERNAME = ''
const VALID_EMAIL = ''
const VALID_PASSWORD = ''

class Register extends Component {
    state = {
        username: VALID_USERNAME,
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
        errors: [],
        loading: false
    }

    handleLogin = () => {
        const { navigation } = this.props;
        const { username, email, password } = this.state;
        const errors = [];

        Keyboard.dismiss();
        this.setState({ loading: true });

        navigation.navigate('App')



        render() {
            return (
                <View>
                    <Text>Register</Text>

                    <TextInput
                        label='Username'
                        style={[styles.input, hasErrors('username')]}
                        defaultValue={this.state.email}
                        onChangeText={text => this.setState({ username: text })}
                        style={styles.input}
                    />
                    <TextInput
                        label='Email'
                        style={[styles.input, hasErrors('email')]}
                        defaultValue={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                        style={styles.input}
                    />
                    <TextInput
                        secure
                        label='Password'
                        style={[styles.input, hasErrors('password')]}
                        defaultValue={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        style={styles.input}
                    />
                    <Button
                        buttonStyle={{
                            height: 80,
                            width: 200,
                            backgroundColor: '#6a7189',
                            marginLeft: 110
                        }}
                        style={styles.butts}
                        type='solid'
                        title='Enter'
                        onPress={() => this.handleLogin} >


                    </Button>
                    <Button
                        style={styles.butts}
                        type='clear'
                        title='Forgot your password?'
                        onPress={() => navigation.navigate('Register')}>
                    </Button>

                </View>
            )
        }
    }


    const styles = StyleSheet.create({
        input: {
            borderRadius: 0,
            borderWidth: 2,
            borderColor: 'transparent',
            borderBottomColor: 'black',
            padding: 10,
            marginTop: 40,
            fontSize: 25

        },
        butts: {
            marginTop: 80
        }
    })


    export default Register