import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Welcome from '../screens2/Welcome'
import Login from '../screens2/Login'
import Terms from '../screens2/Terms'
import Register from '../screens2/Register'
import Forgot from '../screens2/Forgot'

const LoginStack = createStackNavigator({
    welcome: {
        screen: Welcome,
        path: 'welcome'
    },

    login: {
        screen: Login,
        path: 'login'
    },

    forgot: {
        screen: Forgot,
        path: 'forgot'
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

export default LoginStack