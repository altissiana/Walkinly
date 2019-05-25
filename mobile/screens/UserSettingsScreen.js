import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button } from 'react-native-elements';
import { signout } from "../actions/Actions";

export default class UserSettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 40,
      backgroundColor: 'dodgerblue'
    },
    headerTitle: "Settings",
    headerTitleStyle: {
      fontSize: 32,
      color: 'white'
    },
    headerTitleContainerStyle: {
      top: -16
    }
  }

  state = {
    isMounted: false
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    })
  }

  handleLogout = () => {
    const { navigation } = this.props;

    if (this.state.isMounted) {
      signout()
        .then(() => {
          navigation.navigate('AuthLoading');
        });
    }
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/grady11.jpg')}
        style={styles.img}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>

          <Button
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
              /* border: '#e2e4e9' */
            }}
            titleStyle={{ color: '#767689', fontSize: 20 }}

            type='solid'
            title='Logout'
            onPress={() => this.handleLogout()}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
})