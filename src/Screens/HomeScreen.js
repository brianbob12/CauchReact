import *  as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Ionicons } from '@expo/vector-icons'

//ract boostrap
import { Carousel } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

//import context suff
import { TaskContext } from "../Context/TaskContext.js"

//import tasks
import RealTask from "../Tasks/RealTask.js"

//import dayList
import DayList from "../DayList/DayList.js"

//TEMPORARY
import SaveTaskToCache from "../Tasks/Caching/SaveTaskToCache.js"
import GetTaskFromCache from "../Tasks/Caching/GetTaskFromCache.js"

//import dayListView
import DayListView from "../DayListView/DayListView.js"

export default class HomeScreen extends React.Component {

  static contextType = TaskContext

  constructor(props, context) {

    super(props)

    const tempDayList = new DayList(Date.now)
    context.RealTaskIDMap["0"] = await GetTaskFromCache("0")
    tempDayList.addRealTask("0", context.RealTaskIDMap)

    this.state = {
      selectedDayList: tempDayList,
      scrollEnabled: true,
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Carousel indicators={false} style={{ width: "100%", height: "100%" }}>
          <Carousel.Item>
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
            <DayListView dayList={this.state.selectedDayList} />
          </Carousel.Item>
          <Carousel.Item>
            <Text>Test</Text>
          </Carousel.Item>
        </Carousel>
      </SafeAreaView>
    );
  }
}