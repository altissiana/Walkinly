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
} from 'react-native'
import navigation from '../navigation2/index';

import { Button } from 'react-native-elements';


class Terms extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal animationType="slide" visible={this.props.visible}>

                <View style={styles.container}>
                    <Text style={styles.title}>Terms of Service</Text>
                    <ScrollView>
                        <Text style={styles.text}>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum."
                        </Text>
                    </ScrollView>
                    <Button
                        title="I understand"
                        onPress={() => this.setState({ showTerms: false })}>
                    </Button>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30
    },
    text: {

    },
    butt: {
        height: 100,
        width: 200,

    }
})


export default Terms