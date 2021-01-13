import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableHighlight, TextInput } from "react-native"

export default (props) => {

  var holdingTitle = "New Task"
  var holdingDescription = "Description"

  return (
    <View style={{ position: "absolute" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}

      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.title}
              onChangeText={(newText) => { holdingTitle = newText }}>
              {holdingTitle}
            </TextInput>
            <TextInput style={styles.description}
              onChangeText={(newText) => { holdingDescription = newText }}>
              {holdingDescription}
            </TextInput>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#00a9d4FF', flex: 3 }}
                onPress={() => {
                  props.onClose(!props.visible, {
                    name: holdingTitle,
                    description: holdingDescription
                  });
                }}
              >
                <Text style={styles.textStyle}>Done</Text>
              </TouchableHighlight>
              <View style={{ flex: 1 }} />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#ff0000FF', flex: 3 }}
                onPress={() => {
                  props.onClose(!props.visible, null);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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