import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Welcome from '../screens2/Welcome'
import Login from '../screens2/Login'
import Terms from '../screens2/Terms'
import Register from '../screens2/Register'

const MainStack = createStackNavigator({
    welcome: {
        screen: Welcome,
        path: 'welcome'
    },

    login: {
        screen: Login,
        path: 'login'
    },

    register: {
        screen: Register,
        path: 'register'
    },

    terms: {
        screen: Terms,
        path: 'terms'
    },

},

    {
        initialRouteName: 'welcome',
    }
);

export default createAppContainer(MainStack)


/* <Route path= /welcome component={Welcome} */