import *  as React from 'react'
import { useState, useRef } from 'react'
import { TouchableOpacity, Text, View, Animated, TouchableWithoutFeedback } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

export default ({ task, onClick, onDeleteTask }) => {
  const [trashIcon, setTrashIcon] = useState("trash-outline")

  return (
    <View style={{ flex: 1, alignItems: "center", flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => { onClick(task) }}
        style={{
          backgroundColor: "#FFFFFFFF",
          borderRadius: 15,
          marginLeft: 30,
          marginRight: 30,
          alignItems: "center",
          flex: 1,
          padding: 15,
          flexDirection: "row"
        }}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <TouchableWithoutFeedback
            onPressIn={() => { setTrashIcon("trash") }}
            onPressOut={() => { setTrashIcon("trash-outline") }}
            onPress={() => { onDeleteTask(task) }}
          >
            <View style={{ flex: 1, padding: 5 }}>
              <Ionicons name={trashIcon} size={20} color="red" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 3 }}>
          <Text>{task.name}</Text>
        </View>
        <View style={{ flex: 1 }} />
      </TouchableOpacity>
    </View >

  )
}