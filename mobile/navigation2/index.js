import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Welcome from '../screens2/Welcome'
import Login from '../screens2/Login'
// import App, { Welcome } from './Login.js';

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
    }
},
    {
        initialRouteName: 'welcome',
    }
);

export default createAppContainer(MainStack)