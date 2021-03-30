import *  as React from 'react'
import { useState } from "react"
import { StyleSheet, Modal, Text, View, TouchableHighlight, TextInput, TouchableWithoutFeedback } from "react-native"
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'
import Slider from "@react-native-community/slider"
import IconSelectionScreen from "../Screens/IconSelectionScreen.js"
export default ({ visible, onClose, task, day, onDaySelected, updateTask }) => {

  //Hooks!
  const [iconScreenVisible, setIconScreenVisible] = useState(false)
  const [iconColor, setIconColor] = useState(null)

  if (task.iconColor !== iconColor) {
    setIconColor(task.iconColor)
  }

  var selectedDay = day

  return (
    <View style={{ position: "absolute" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <IconSelectionScreen
          visible={iconScreenVisible}
          onClose={(icon) => {
            setIconScreenVisible(false)
            task.icon = icon
            task.iconColor = (task.iconColor == null || task.iconColor == undefined) ? "#00a9d4" : task.iconColor
            updateTask(task)
          }}
          selectedIcon={task.icon}
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              flex: 1,
              alignSelf: "stretch",
              alignItems: "stretch", justifyContent: "space-evenly",
              flexDirection: "column"
            }}>
              <View style={{}}>
                <TextInput style={styles.title}
                  onChangeText={(newText) => { task.name = newText }}>
                  {task.name}
                </TextInput>
              </View>
              <View style={{}}>
                <TextInput style={styles.description}
                  onChangeText={(newText) => { task.description = newText }}
                  multiline={true}
                >
                  {task.description}
                </TextInput>
              </View>
              <View style={{}}>
                <RNPickerSelect
                  onValueChange={(value) => {
                    onDaySelected(value)
                    selectedDay = value
                  }}
                  items={[
                    { label: 'Monday', value: 'monday' },
                    { label: 'Tuesday', value: 'tuesday' },
                    { label: 'Wednesday', value: 'wednesday' },
                    { label: 'Thursday', value: 'thursday' },
                    { label: 'Friday', value: 'friday' },
                    { label: 'Saturday', value: 'saturday' },
                    { label: "Sunday", value: "sunday" }
                  ]}
                  placeholder={{}}
                  value={selectedDay}
                />
              </View>
              <View style={{ flexDirection: "column", height: 110, alignItems: "stretch" }}>
                <View style={{ height: 50, alignItems: "center" }}>
                  <TouchableWithoutFeedback
                    style={{ flex: 1, alignContent: "center" }}
                    onPress={() => { setIconScreenVisible(true) }}
                  >
                    <Ionicons
                      name={
                        (task.icon == null || task.icon == undefined) ?
                          "add-circle" : task.icon
                      }
                      size={50}
                      color={
                        (task.icon == null || task.icon == undefined) ?
                          "#C5C5C5" : task.iconColor}
                    />
                  </TouchableWithoutFeedback>
                </View>
                {/*contingent rendering - only renders when a icon is selected*/}
                {!(task.icon == null || task.icon == undefined) &&
                  <View style={{ flex: 3, paddingTop: 15, flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        task.iconColor = "#00a9d4"
                        updateTask(task)
                        setIconColor("#00a9d4")
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: "#00a9d4",
                          borderColor: "#000000",
                          borderWidth: iconColor === "#00a9d4" ? 2 : 0
                        }}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        task.iconColor = "#00d412"
                        updateTask(task)
                        setIconColor("#00d412")
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: "#00d412",
                          borderColor: "#000000",
                          borderWidth: iconColor === "#00d412" ? 2 : 0
                        }}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        task.iconColor = "#d40031"
                        updateTask(task)
                        setIconColor("#d40031")
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: "#d40031",
                          borderColor: "#000000",
                          borderWidth: iconColor === "#d40031" ? 2 : 0
                        }}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        task.iconColor = "#c900d4"
                        updateTask(task)
                        setIconColor("#c900d4")
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: "#c900d4",
                          borderColor: "#000000",
                          borderWidth: iconColor === "#c900d4" ? 2 : 0
                        }}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        task.iconColor = "#13edc9"
                        updateTask(task.iconColor)
                        setIconColor("#13edc9")
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                          backgroundColor: "#13edc9",
                          borderColor: "#000000",
                          borderWidth: task.iconColor === "#13edc9" ? 2 : 0
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                }
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#00a9d4FF', flex: 3 }}
                  onPress={() => {
                    onClose(!visible, task, selectedDay)
                  }}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </TouchableHighlight>
                <View style={{ flex: 1 }} />
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#ff0000FF', flex: 3 }}
                  onPress={() => {
                    onClose(!visible, null)
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View >
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 100,
    marginBottom: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30
  },
  description: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  }
})