import React, { Component } from 'react'
import {
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    View,
    Text,
    Animated
} from 'react-native'
import navigation from '../navigation2/index';
import Background from '../assets/grady3.jpg'
import { Button } from 'react-native-material-ui';

// import { ScrollView } from 'react-native-gesture-handler';
// import { Animated } from "react-animated-css";



class Welcome extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         showTerms: true
    //     }
    // }
    // static navigationOptions = {
    //     header: null
    // }

    // renderTermsService() {
    //     return (
    //         <Animated animationIn="slideInUp" visible={this.state.showTerms}>
    //             <View>
    //                 <Text>Terms of Service</Text>
    //                 <ScrollView>
    //                     <Text>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                     <Text>
    //                         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    //                 </Text>
    //                 </ScrollView>

    //                 <Button title="I understand" onPress={() => this.setState({ showTerms: false })}>
    //                 </Button>
    //             </View>
    //         </Animated >
    //     )
    // }

    render() {
        const { navigation } = this.props;

        return (
            <View>
                <Image source={Background} style={{ width: '100%', position: 'absolute', zIndex: -1 }} />
                <View style={styles.container}>
                    <View center bottom flex={0.5}>
                        <Text style={styles.welcome}>Don't Walk. Alone.</Text>
                        <Text style={styles.welcome2}>We'll watch over you.</Text>
                    </View>
                    <View>
                        {/* <Button title='Login' variant="contained" onPress={() => navigation.navigate('Login')}>
                        </Button> */}
                        <Button raised primary text="Login" title='Login' variant="contained" onPress={() => navigation.navigate('Login')} />
                        {/* <Button title='Signup' variant="outlined" onPress={() => navigation.navigate('Signup')}>
                        </Button> */}
                        <Button accent primary text="Signup" title='Signup' variant="outlined" onPress={() => navigation.navigate('Signup')} />
                        {/* <Button title='Terms of Service' onPress={() => this.setState({ showTerms: true })}>
                        </Button> */}
                        <Button primary text="Terms of Service" title='Terms of Service' onPress={() => this.setState({ showTerms: true })} />
                    </View>
                    {/* {this.renderTermsService()} */}
                </View >
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginTop: '100%',
        marginLeft: '20%'
    },
    welcome:
    {
        color: '#000000',
        fontSize: 30,

    },
    welcome2:
    {
        color: '#B0C4DE',
        fontSize: 18,

    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }

})

export default Welcome