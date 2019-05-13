import React, { Component } from 'react'
import {
    StyleSheet
} from 'react-native'
import { Button, Block, Text } from '../components'

export default class Welcome extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Block>
                <Block center middle flex={0.3}>
                    <Text h1 center bold>
                        Don't Walk.
                <Text h1 primary>Alone.</Text>
                    </Text>
                    <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>We'll watch over you.</Text>
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => { }}>
                        <Text center semibold white>Login</Text>
                    </Button>
                    <Button shadow onPress={() => { }}>
                        <Text center semibold>Signup</Text>
                    </Button>
                    <Button onPress={() => { }}>
                        <Text center semibold gray>Terms of service</Text>
                    </Button>
                </Block>
            </Block>

        )
    }
}

const styles = StyleSheet.create({

})