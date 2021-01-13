import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"

export default ({ visible }) => {
  return (
    <View style={{ flex: 1, position: "absolute" }}>
      { visible &&
        <View style={{ flex: 1 }}>
          <Text>Work in progress</Text>
        </View >
      }
    </View>
  )
}