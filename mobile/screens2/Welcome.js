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
import Terms from '../components/Terms'

class Welcome extends Component {
    /* static navigationOptions = {
        header: null
    } */

    state = {
        showTerms: false
    }



    render() {

        const { navigation } = this.props;

        return (
            <View>
                <Image source={Background} style={{ width: '100%', position: 'absolute', zIndex: -1 }} />
                <View style={styles.container}>
                    <View>
                        <Text style={styles.welcome}>Don't Walk. Alone.</Text>
                    </View>
                    <View>
                        <Text style={styles.logo}> Walkinly </Text>
                    </View>
                    <View style={styles.containerStyle}>
                        <Button
                            type="solid"
                            title="LOGIN"
                            onPress={() => navigation.navigate('Login')}
                            style={{
                                marginBottom: 20,
                                shadowColor: "#fff",

                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,

                                elevation: 6,
                            }}
                            buttonStyle={{
                                height: 50,
                                width: 150,
                                backgroundColor: '#e2e4e9',
                                border: '#e2e4e9'
                            }}
                            titleStyle={{ color: '#767689', fontSize: 20 }}
                        />
                        <Button
                            type="outline"
                            title="Signup"
                            onPress={() => navigation.navigate('Signup')}
                            style={{
                                marginBottom: 20,
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
                                borderColor: '#6a7189',
                            }}
                            titleStyle={{ color: '#6a7189', fontSize: 20 }}
                        />
                        <Button raised
                            type="clear"
                            title='Terms of Service'
                            onPress={() => this.setState({ showTerms: true })}
                            style={{ marginBottom: 40 }}
                            titleStyle={{ color: '#6a7189', fontSize: 20 }}

                        />
                        {this.state.showTerms ? <Terms /> : <View />}
                    </View>
                </View >
            </View>
        )
    }
};






const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginTop: 480,
        marginLeft: '25%',
    },
    containerStyle: {
        marginRight: 40,
        flex: 1,
        flexDirection: 'column',
    },
    welcome:
    {
        color: 'black',
        fontSize: 40,
        marginTop: -350,
        marginRight: 20,
        fontFamily: 'AvenirNext-UltraLight',
        shadowColor: "#92a9fe",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    logo:
    {
        color: '#e2e4e9',
        fontSize: 30,
        marginTop: -250,
        marginLeft: -30,
        fontFamily: 'Noteworthy-Bold',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 24,

    },
    ImageBackground: {
        flex: 1,
        resizeMode: 'cover',
    }

})

export default Welcome