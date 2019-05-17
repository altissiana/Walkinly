import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'

import Welcome from '../screens/WelcomeScreen'
import Login from '../screens/LoginScreen'
import Terms from '../screens/TermsScreen'
import Register from '../screens/RegisterScreen'
import Forgot from '../screens/ForgotScreen'

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