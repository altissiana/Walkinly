import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Welcome from '../screens2/Welcome'
import Login from '../screens2/Login'
// import Signup from '../screens/Signup'
// import Forgot from '../screens/Forgot'
// import Map from '../screens/Map'
// import Settings from '../screens/Settings' 



const screens = createtackNavigator({
    Welcome,
    Login,
    //Signup,
    //Forgot,
    // Map,
    // Settings,

}, {
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base * 4,
                backgroundColor: theme.colors.white,
                borderBottomColor: 'transparent',
                elevation: 0,
            },
            // headerBackImage: <Image source={require('../assets/icons/back.png')}/>, got get a icon and call it back.png?
            headerBackTitle: null,
            headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base,
            },
            headerRightContainerStyle: {
                alignItems: 'center',
                paddingRight: theme.sizes.base
            },
        }
    });

export default createAppContainer(screens);