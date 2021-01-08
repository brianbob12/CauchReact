import *  as React from 'react';
import { StyleSheet, ScrollView, Text, View } from "react-native"


import { Ionicons } from '@expo/vector-icons'

//import context suff
import { TaskContext } from "../Context/TaskContext.js"

//import tasks
import RealTask from "../Tasks/RealTask.js"

//impory Slidy
import Slidy from "../Slidy/Slidy.js"

//import dayList
import DayList from "../DayList/DayList.js"

//import dayListView
import DayListView from "../DayListView/DayListView.js"

export default (props, context) => {

  const tempDayList = new DayList(Date.now)


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Slidy>
        <View>
          <View
            style={{
              width: "100%",
              height: "7%",
              backgroundColor: "#FFFFFFFF",
              borderBottomColor: "#d8d8d8",
              borderBottomWidth: 1,
              justifyContent: "space-between",
              alignContent: "center",
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="reorder-four" size={35} color="gray" />
            </View>
            <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
              <Text>Schedule for <b>Today</b></Text>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="add" size={35} color="gray" />
            </View>
          </View>
          <DayListView dayList={tempDayList} />
        </View>
        <View>
          <Text>Test</Text>
        </View>
      </Slidy>
    </View>
  )

}
