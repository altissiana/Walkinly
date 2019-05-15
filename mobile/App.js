import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppLoading, Asset } from 'expo'
import Navigation from './navigation2/index'
import { Block } from './components'
import Welcome from './screens2/Welcome'


export default class App extends React.Component {
  state = {
    isLoadingComplete: true
  }


  render() {



    return (
      <Welcome />
    )
  }


}