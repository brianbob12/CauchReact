import * as React from "react"
import { StyleSheet, View, Text, Modal, TouchableHighlight } from "react-native"
import IconSelector from "../IconSelector/IconSelector.js"

export default ({ visible, onClose }) => {
  return (
    <View style={{ position: "absolute" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={{
          flex: 1, justifyContent: "center", alignItems: "stretch",
          backgroundColor: "white"
        }}
        >
          <View style={{ flex: 1, flexDirection: "column", alignItems: "stretch", justifyContent: "center" }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}>
              <TouchableHighlight
                onPress={() => {
                  //I may want to add args to this later
                  onClose()
                }}
                style={{
                  backgroundColor: "#c5c5c5",
                  borderRadius: 20,
                  margin: 15,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 70,
                  height: 30
                }}
              >
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 4, flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch" }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                <Text style={{}}>Free Icons</Text>
              </View>
              <View style={{ flex: 2, flexDirection: "row", justifyContent: "space-around" }}>
                <IconSelector iconName={"book-outline"} onPress={() => { }} locked={false} />
                <IconSelector iconName={"barbell-outline"} onPress={() => { }} locked={false} />
                <IconSelector iconName={"school-outline"} onPress={() => { }} locked={false} />
                <IconSelector iconName={"brush-outline"} onPress={() => { }} locked={false} />
                <IconSelector iconName={"calculator-outline"} onPress={() => { }} locked={false} />
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text>Icon Selection Page</Text>
            </View>
            <View style={{ flex: 16 }}>
              <IconSelector iconName={"arrow-up-circle-outline"} onPress={() => { }} locked={true} />
            </View>
          </View>
        </View>
      </Modal >
    </View >
  )
}