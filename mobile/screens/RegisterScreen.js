import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    AsyncStorage
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

    componentDidMount () {
        this.setState({
            isMounted: true
        });
    }

    handleRegister = async () => {
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

    componentWillUnmount () {
        this.setState({
            isMounted: false
        });
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;

        return (
            <View>
                <TextInput
                    label='FirstName'
                    placeholder='First Name'
                    style={[styles.input, hasErrors('firstname')]}
                    defaultValue={this.state.firstname}
                    onChangeText={text => this.setState({ firstname: text })}
                    style={styles.input}
                />
                <TextInput
                    label='LastName'
                    placeholder='Last Name'
                    style={[styles.input, hasErrors('lastname')]}
                    defaultValue={this.state.lastname}
                    onChangeText={text => this.setState({ lastname: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='Email'
                    placeholder='Email'
                    style={[styles.input, hasErrors('email')]}
                    defaultValue={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='PhoneNumber'
                    placeholder='Phone Number'
                    style={[styles.input, hasErrors('phonenumber')]}
                    defaultValue={this.state.phonenumber}
                    onChangeText={text => this.setState({ phonenumber: text })}
                    style={styles.input}
                />
                <TextInput
                    secure
                    label='Password'
                    placeholder='Password'
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
                    onPress={() => this.handleRegister()}
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
        borderBottomColor: 'black',
        padding: 10,
        marginTop: 40,
        fontSize: 25
    },
    butts: {
        marginTop: 80
    }
});