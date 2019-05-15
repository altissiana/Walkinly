import React, { Component } from 'react'
import {
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    View,
    Text,
    Animated,
    Modal,
    Block
} from 'react-native'
import navigation from '../navigation2/index';
import Background from '../assets/grady3.jpg'
import { Button } from 'react-native-elements';


class Terms extends Component {
    state = {
        visible: true
    }

    render() {
        return (
            <Modal animationType="slide" visible={this.state.visible}>
                <Block>
                    <Text>Terms of Service</Text>
                    <ScrollView>
                        <Text>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum."
                    </Text>
                    </ScrollView>
                    <Button title="I understand" onPress={() => this.setState({ visible: false })}>
                    </Button>
                </Block>
            </Modal>
        )
    }
}

export default Terms