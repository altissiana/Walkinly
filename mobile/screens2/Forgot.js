import React, { Component } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const VALID_EMAIL = '';


class Forgot extends Component {
    state = {
        email: VALID_EMAIL,
        errors: [],
        loading: false,
        accepted: true
    }

    handleLogin = () => {
        const { navigation } = this.props;
        const { email } = this.state;
        const errors = [];

        Keyboard.dismiss();
        this.setState({ loading: true });

    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

        return (
            <View>
                <TextInput
                    secure
                    label='Email'
                    placeholder='Email'
                    style={[styles.input, hasErrors('email')]}
                    defaultValue={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.input}
                />
                <TouchableOpacity disabled={!this.state.accepted}
                    onPress={() => alert("Check your email")}
                    style={this.state.accepted ? styles.button : styles.buttonDisabled}>
                    <Text style={styles.buttonLabel}> Send</Text>
                </TouchableOpacity>
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
    buttonDisabled: {
        backgroundColor: '#999',
        borderRadius: 5,
        padding: 10
    },

    buttonLabel: {
        fontSize: 30,
        color: '#000',
        alignSelf: 'center',
        backgroundColor: 'dodgerblue',
        height: 80,
        width: 120,
        backgroundColor: '#6a7189',
        padding: 20

    }
})

export default Forgot