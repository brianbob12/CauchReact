import *  as React from 'react'
import { StyleSheet, ScrollView, Text, View } from "react-native"

//a caursel of storts

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      {props.children}
    </View>
  )
}