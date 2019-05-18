import React from "react";
import { View, Text, AsyncStorage, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

export default class UserSettingsScreen extends React.Component {
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
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32
  },
})