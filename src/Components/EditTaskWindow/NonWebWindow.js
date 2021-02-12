import *  as React from 'react'
import { useState } from "react"
import { StyleSheet, Modal, Text, View, TouchableHighlight, TextInput, TouchableWithoutFeedback } from "react-native"
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'
import Slider from "@react-native-community/slider"
import IconSelectionScreen from "../Screens/IconSelectionScreen.js"
export default ({ visible, onClose, task, day }) => {

  //Hooks!
  const [iconScreenVisible, setIconScreenVisible] = useState(false)

  var selectedDay = "monday"

  if (day != null) {
    selectedDay = day
  }

  var selectedIcon = null

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
            task.iconColor = "#C5C5C5"
          }}
          selectedIcon={task.icon}
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "column" }}>
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
                  onValueChange={(value) => selectedDay = value}
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
              <View style={{ flexDirection: "column", height: 130, alignItems: "center" }}>
                <View style={{ height: 50, alignContent: "center" }}>
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
                      color={"#C5C5C5"}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ flex: 3 }}>
                  <Slider
                    style={{ width: 200, height: 25 }}
                    minimumValue={0}
                    maximumValue={225}
                    minimumTrackTintColor="#FF0000"
                    maximumTrackTintColor="#c5c5c5"
                    thumbTintColor="#FF0000"
                  />
                  <Slider
                    style={{ width: 200, height: 25 }}
                    minimumValue={0}
                    maximumValue={225}
                    minimumTrackTintColor="#00FF00"
                    maximumTrackTintColor="#c5c5c5"
                    thumbTintColor="#00FF00"
                  />
                  <Slider
                    style={{ width: 200, height: 25 }}
                    minimumValue={0}
                    maximumValue={225}
                    minimumTrackTintColor="#0000FF"
                    maximumTrackTintColor="#c5c5c5"
                    thumbTintColor="#0000FF"
                  />
                </View>
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
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 80,
    marginBottom: 80,
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