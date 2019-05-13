import React from 'react'
import { Image } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Welcome from '../screens/Welcome'
// import Login from '../screens/Login'
// import Map from '../screens/Map'
// import Settings from '../screens/Settings' 



const screens = createtackNavigator({
    Welcome,
    // Login,
    // Map,
    // Settings,

}, {
        defaultNavigationOptions: {
            headerStyle: {},
            headerBackImage: <Image />,
            headerBackTitle: null,
            headerLeftContainerStyle: {},
            headerRightContainerStyle: {}
        }
    })

export default createAppContainer(screens);