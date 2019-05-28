import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';
import { register } from '../actions/Actions';

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

    handleRegister = () => {
        const { navigation } = this.props;
        const { firstname, lastname, email, phonenumber, password } = this.state;

        Keyboard.dismiss();
        this.state.isMounted && this.setState({ loading: true });

        if (this.state.isMounted) {
            register(email, password, phonenumber, firstname, lastname)
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
        });
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;

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
                        style={styles.input}
                        defaultValue={this.state.firstname}
                        onChangeText={text => this.setState({ firstname: text })}
                        style={styles.input}
                    />
                    <TextInput
                        label='LastName'
                        placeholder='Last Name'
                        placeholderTextColor="#FFFFFF"
                        style={styles.input}
                        defaultValue={this.state.lastname}
                        onChangeText={text => this.setState({ lastname: text })}
                        style={styles.input}
                    />
                    <TextInput
                        secure
                        label='Email'
                        placeholder='Email'
                        placeholderTextColor="#FFFFFF"
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
                        placeholderTextColor="#FFFFFF"
                        style={styles.input}
                        defaultValue={this.state.phonenumber}
                        onChangeText={text => this.setState({ phonenumber: text })}
                        style={styles.input}
                    />
                    <TextInput
                        secure
                        label='Password'
                        placeholder='Password'
                        placeholderTextColor="#FFFFFF"
                        style={styles.input}
                        autoCapitalize='none'
                        defaultValue={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        style={styles.input}
                    />
                    <Button
                        type="outline"
                        title="Enter"
                        onPress={() => this.handleRegister(first)}
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