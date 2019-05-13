import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native';

import SosButton from './components/SosButton';
import SimpleMap from "./components/Map";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.phoneInfoBar}></View>
                <View style={styles.centerContent}>
                    <Text>Map</Text>
                </View>
                <SimpleMap />
                <SosButton />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: "flex-end",
        alignItems: "center"

        // flex: 1,
        // backgroundColor: "transparent",
        // alignItems: "center",
        // justifyContent: "center"
    },
    phoneInfoBar: {
        backgroundColor: "#FFF",
        height: 20,
        width: "100%"
    },
    centerContent: {
        flex: 1,
        backgroundColor: "dodgerblue",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    sosButton: {
        backgroundColor: "red",
        height: 100,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0
    },
    sosCircle: {
        borderWidth: 2,
        borderColor: "#FFF",
        borderRadius: 50,
        height: 90,
        width: 90,
        alignItems: "center",
        justifyContent: "center"
    },
    sosText: {
        fontSize: 40,
        color: "#FFF"
    }
});