import React, { Component } from "react";
import { View, Text, AsyncStorage, StyleSheet, ImageBackground } from "react-native";
import { Button } from 'react-native-elements';

export default class UserSettingsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  handleLogout = async () => {
    const { navigation } = this.props;

    await AsyncStorage.removeItem('userToken');
    navigation.navigate('AuthLoading');
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/grady4.jpeg')}
        style={styles.img}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
          <Text style={styles.headerText}>
            Change Settings
        </Text>

          <Button
            buttonStyle={{
              height: 80,
              width: 200,
              backgroundColor: '#6a7189',
            }}
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
  headerText: {
    fontSize: 32
  },
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
})