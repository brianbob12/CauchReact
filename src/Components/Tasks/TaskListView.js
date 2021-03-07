import *  as React from 'react'
import { useState, useRef } from 'react'
import { TouchableOpacity, Text, View, Animated, TouchableWithoutFeedback } from 'react-native'
import { Menu, Divider } from "react-native-paper"
import CheckBox from "@react-native-community/checkbox"

import { Ionicons } from '@expo/vector-icons'

export default ({ task, onClick, onDeleteTask, onChecked, completed }) => {

  //task is an object of the task containg
  //onClick is a callback
  //onDeleteTask is a callback for when the task is deleted
  //onChecked is a callback that runs when the checkbox is checked
  //completed is a boolean for if the task should be drawn as completed

  const [toggleCheckbox, setToggleCheckbox] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  if (completed != toggleCheckbox) {
    setToggleCheckbox(completed)
  }

  return (
    <View style={{ flex: 1, alignItems: "center", flexDirection: 'row' }}>
      <TouchableOpacity onPress={completed ? () => { } : () => { onClick(task) }}
        style={{
          backgroundColor: "#FFFFFFFF",
          borderRadius: 15,
          marginLeft: 30,
          marginRight: 30,
          alignItems: "center",
          flex: 1,
          padding: 15,
          flexDirection: "row"
        }}
        onLongPress={() => {
          //dispaly menu
          setMenuVisible(true)
        }}
      >
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <CheckBox
            disabled={false}
            value={toggleCheckbox}
            onValueChange={(value) => {
              onChecked(task)
              setToggleCheckbox(value)
            }}
            tintColor={"#00a9d4"}
            tintColors={{ true: "#00a9d4", false: "#00a9d4" }}
          />
        </View>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<View style={{ width: 1, height: 1 }} />}
        >
          <Menu.Item
            title="Delete"
            icon="delete"
            onPress={onDeleteTask}
          />
          <Divider />
          <Menu.Item
            title="Move Week"
            icon="calendar-arrow-right"
            onPress={() => { }}
            disabled
          />
          <Menu.Item
            title="Copy"
            icon="content-copy"
            onPress={() => { }}
            disabled
          />
          <Menu.Item
            title="Cut"
            icon="content-cut"
            onPress={() => { }}
            disabled
          />
        </Menu>
        <View style={{ flex: 4 }}>
          <Text style={{ textDecorationLine: toggleCheckbox ? "line-through" : "none" }}>
            {task.name}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", flexDirection: "row", alignItems: "center" }} >
          {(task.icon != null && task.icon != undefined) &&
            <Ionicons name={task.icon} size={40} color={toggleCheckbox ? "#aaaaaa" : task.iconColor} />
          }
        </View>
      </TouchableOpacity>
    </View >
  )
}