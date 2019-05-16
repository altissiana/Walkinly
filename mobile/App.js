import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppLoading, Asset } from 'expo'
import MainStack from './navigation2/index'


export default class App extends React.Component {
  state = {
    isLoadingComplete: true
  }

  render() {
    return (
      <MainStack />
    )
  }
}