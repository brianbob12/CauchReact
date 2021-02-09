import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableHighlight, TextInput } from "react-native"
import RNPickerSelect from 'react-native-picker-select'

export default ({ visible, onClose, task, day }) => {

  var selectedDay = "monday"

  if (day != null) {
    selectedDay = day
  }

  return (
    <View style={{ position: "absolute" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}


      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.title}
              onChangeText={(newText) => { task.name = newText }}>
              {task.name}
            </TextInput>
            <TextInput style={styles.description}
              onChangeText={(newText) => { task.description = newText }}
              multiline={true}
            >
              {task.description}
            </TextInput>
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