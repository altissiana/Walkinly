import React, { Component } from 'react'
import { Image } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Welcome from '../screens2/Welcome'
//import Login from '../screens2/Login'
// import Signup from '../screens/Signup'
// import Forgot from '../screens/Forgot'
// import Map from '../screens/Map'
// import Settings from '../screens/Settings' 



const MainStack = createStackNavigator({
    welcome: {
        screen: Welcome,
        path: '/welcome'
    }
    // Welcome: {
    //     welcome: Welcome
    // }

    //login: Login,
    //Signup,
    //Forgot,
    // Map,
    // Settings,
},
    {
        initialRouteName: 'welcome',
    }
);

// class screens extends Component {
//     render() {
//         return (
//             <Welcome />
//         )
//     }
// }
export default createAppContainer(MainStack)