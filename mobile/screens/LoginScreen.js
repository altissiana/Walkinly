import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements';

import { signin } from '../actions/Actions';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        isMounted: false,
        isError: false,
        errorText: ''
    }

    componentDidMount () {
        this.setState({
            isMounted: true
        });
    }

    handleLogin = async () => {
        const { navigation } = this.props;
        const { email, password } = this.state;

        Keyboard.dismiss();
        this.state.isMounted && this.setState({ loading: true });

        if (this.state.isMounted) {
            signin(email, password)
                .then(() => {
                    navigation.navigate('Main');
                })
                .catch(err => {
                    this.setState({
                        isError: true,
                        errorText: err
                    })
                });
        }
    }

    componentWillUnmount () {
        this.setState({
            isMounted: false
        })
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;

        return (
            <View>
                <Text style={{ color: 'black', fontSize: 40 }}>Login</Text>

                <TextInput
                    label='Email'
                    placeholder='Email'
                    style={styles.input}
                    defaultValue={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='Password'
                    placeholder='Password'
                    style={styles.input}
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
                    onPress={() => this.handleLogin()} >


                </Button>
                <Button
                    style={styles.butts}
                    type='clear'
                    title='Forgot your password?'
                    onPress={() => navigation.navigate('Register')}>
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
        borderBottomColor: 'black',
        padding: 10,
        marginTop: 40,
        fontSize: 25
    },
    butts: {
        marginTop: 80
    },
});