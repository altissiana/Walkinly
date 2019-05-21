import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    View,
    TextInput,
    AsyncStorage,
    ImageBackground
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

    componentWillUnmount() {
        this.setState({
            isMounted: false
        })
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;

        return (
            <ImageBackground
                source={require('../assets/grady10.jpg')}
                style={styles.img}>
                <View>
                    <Text style={{
                        color: '#6a7189', fontSize: 40
                    }}>Login</Text>

                <TextInput
                    label='Email'
                    placeholder='Email'
                    placeholderTextColor="#FFFFFF"
                    defaultValue={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='Password'
                    placeholder='Password'
                    placeholderTextColor="#FFFFFF"
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
                            arginTop: 40,
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
            </ImageBackground>
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

    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});