import React, { Component } from 'react'
import { TextField } from 'react-native'
import axios from 'axios'
import { Button } from 'react-native-elements';
import {
    View,
    Form
} from 'react-native';

const title = {
    pageTitle: 'Forgot Password Screen'
}

class ForgotScreen extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    sendEmail = e => {
        e.preventDefault();
        if (this.state.email = '') {
            this.setState({
                showError: false,
                messageFromServer: '',
            });
        } else {
            axios
                .post('http://10.68.0.155:3001/api/forgotPassword', {
                    email: this.state.email
                })
                .then(response => {
                    if (response.data.emailFound) {
                        this.setState({
                            showError: false,
                            messageFromServer: 'recovery email sent',
                        });
                    } else {
                        this.setState({
                            showError: true,
                            messageFromServer: '',
                        });
                    }
                })
                .catch(error => {
                    console.log(error.data)
                })
        }
    }

    render() {
        const { email, messageFromServer, showNullError, showError } = this.state;

        return (
            <View>
                <Form className='profile-form' onSubmit={this.sendEmail}>
                    <TextField
                        style={style.input}
                        id='email'
                        label='email'
                        value={email}
                        onChange={this.handleChange('email')}
                        placeholder='Email Address'
                    />
                    <SubmitButtons
                        style={style.butt}
                        buttonText={'Send Password Reset Email'}
                    />
                </Form>
                {showNullError && (
                    <View>
                        <p>The email address cannot be null.</p>
                    </View>
                )}
                {showError && (
                    <View>
                        <p>
                            That email address isn't recognized. Please try again or register for a new account.
                        </p>
                    </View>
                )}
                <Button
                    title='Go Home'
                    onPress={() => this.props.navigation.navigate('Welcome')}
                />
            </View>

        )
    }
}

export default ForgotScreen