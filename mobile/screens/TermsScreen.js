import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Modal,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native'

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

export default class Terms extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        accepted: false
    }

    render() {
        return (
            <ImageBackground
                source={require('../assets/grady5.jpg')}
                style={styles.img}>
                <View style={styles.container}>
                    <Text style={styles.title}>Terms and conditions</Text>
                    <ScrollView
                        style={styles.tcContainer}
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                this.setState({
                                    accepted: true
                                })
                            }
                        }}
                    >
                        <Text style={styles.tcP}>Welcome to our App. If you continue to browse and use this app, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [business name]’s relationship with you in relation to this app. If you disagree with any part of these terms and conditions, please do not use our app.</Text>
                        <Text style={styles.tcP}>The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner of the app whose registered office is [address]. Our company registration number is [company registration number and place of registration]. The term ‘you’ refers to the user or viewer of our app.</Text>
                        <Text style={styles.tcL}>{'\u2022'} The content of the pages of this app is for your general information and use only. It is subject to change without notice.</Text>
                        <Text style={styles.tcL}>{'\u2022'} This app uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: [insert list of information].</Text>
                        <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this app for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
                        <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this app is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this app meet your specific requirements.</Text>
                        <Text style={styles.tcL}>{'\u2022'} This app contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
                        <Text style={styles.tcL}>{'\u2022'} All trademarks reproduced in this app, which are not the property of, or licensed to the operator, are acknowledged on the app.
                         Unauthorised use of this app may give rise to a claim for damages and/or be a criminal offence.</Text>
                        <Text style={styles.tcL}>{'\u2022'} From time to time, this app may also include links to other app. These links are provided for your convenience to provide further information. They do not signify that we endorse the app. We have no responsibility for the content of the linked app.</Text>
                        <Text style={styles.tcL}>{'\u2022'} Your use of this app and any dispute arising out of such use of the app is subject to the laws of England, Northern Ireland, Scotland and Wales.</Text>
                        <Text style={styles.tcP}>{'\u2022'} The use of this app is subject to the following terms of use</Text>
                        <TouchableOpacity disabled={!this.state.accepted}
                            onPress={() => this.props.navigation.navigate('welcome')}

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
                            }}
                            titleStyle={{ color: '#767689', fontSize: 20 }}

                            style={this.state.accepted ? styles.button : styles.buttonDisabled}>
                            <Text style={styles.buttonLabel}>Accept</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        marginTop: 20,
        fontSize: 22,
        alignSelf: 'center',
        color: 'white'
    },
    tcP: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12,
        color: 'white'
    },
    tcP: {
        marginTop: 10,
        fontSize: 12,
        color: 'white'
    },
    tcL: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12,
        color: 'white'
    },
    tcContainer: {
        marginTop: 20,
        marginBottom: 15,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 100,
        marginTop: 80,
        width: 200,
        height: 80,
        marginLeft: 100
    },
    buttonLabel: {
        fontSize: 28,
        color: 'black',
        alignSelf: 'center',
        padding: 10
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})