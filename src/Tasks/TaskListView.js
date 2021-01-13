import *  as React from 'react'
import { useState, useRef } from 'react'
import { TouchableOpacity, Text, View, Animated } from 'react-native'

export default ({ task }) => {
  const [selected, setSelected] = useState(false)


  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity onPress={() => {
        setSelected(!selected)
      }}
        style={{ backgroundColor: "#FFFFFFFF", borderRadius: 15, padding: 50, alignItems: "center" }}>
        <View>
          <Text>{task.name}</Text>
        </View>

      </TouchableOpacity>
    </View>

  )
}