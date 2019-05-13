import React, { Component } from 'react'
import {
    StyleSheet,
    Modal,
    ScrollView,
    View,
    Text,
    Button
} from 'react-native'
import navigation from '../navigation2/index';

class Welcome extends Component {
    // static navigationOptions = {
    //     header: null
    // }

    // state = {
    //     showTerms: false
    // }

    // renderTermsService() {
    //     return (
    //         <Modal animationType="slide" visible={this.state.showTerms}>
    //             <View space='between'>
    //                 <Text h2 light>Terms of Service</Text>
    //                 <ScrollView>
    //                     <Text caption gray height={18}>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text caption gray height={18}>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text caption gray height={18}>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text caption gray height={18}>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text caption gray height={18}>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text caption gray height={18}>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                 </ScrollView>

    //                 <Button title="I understand" gradient onPress={() => this.setState({ showTerms: false })}>
    //                     {/* <Text center white>I understand</Text> */}
    //                 </Button>
    //             </View>
    //         </Modal >
    //     )
    // }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View center bottom flex={0.5}>
                    <Text style={styles.welcome}>Don't Walk. Alone.</Text>
                    <Text style={styles.welcome2}>We'll watch over you.</Text>
                </View>
                <View middle>
                    <Button title="Login" gradient onPress={() => navigation.navigate('Login')}>
                    </Button>
                    <Button title="SignUp" shadow onPress={() => navigation.navigate('Signup')}>
                    </Button>
                    <Button title="Terms of Service" onPress={() => this.setState({ showTerms: true })} >
                    </Button>
                </View>
                {/* {this.renderTermsService()} */}
            </View >

        )
    }
}

// Welcome.defaultProps = {
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome:
    {
        color: '#000000',
        fontSize: 30,
        marginBottom: 150,

    },
    welcome2:
    {
        color: '#B0C4DE',
        fontSize: 18,
        marginTop: -120,
        marginLeft: 30
    }

})

export default Welcome