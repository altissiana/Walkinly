import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';
import { Button, Block, Text } from '../components'





export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.login} behavior='padding'>
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <input
                            label='Email'
                            style={styles.input}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}

                        />
                        <input
                            secure
                            label='Password'
                            style={styles.input}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ email: text })}

                        />
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 3,
        justifyContent: 'center'

    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})