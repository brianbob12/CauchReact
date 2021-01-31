import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight, ScrollView } from "react-native"

import Constants from "expo-constants"

import { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import getDayToday from "../../Functions/DayList/GetDayToday.js"



//import dayListView
import DayListView from "../DayListView/DayListView.js"
import GetAllDays from '../../Functions/WeekList/GetAllDays.js'
import SaveDayListToCache from '../../Functions/DayList/SaveDayListToCache.js'
import GetDayListFromCache from "../../Functions/DayList/GetDayListFromCache.js"

//selectedWeek is a list of days in the week
export default ({
  mondayDayList,
  tuesdayDayList,
  wednesdayDayList,
  thursdayDayList,
  fridayDayList,
  saturdayDayList,
  sundayDayList,
  onTaskClicked
}) => {

  const [addTaskPopup, setAddTaskPopup] = useState(false)

  const [selectedTask, setSelectedTask] = useState(null)

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {mondayDayList != null &&
            <View style={{ flex: 1 }}>
              {mondayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Monday</Text>
                  <DayListView
                    dayList={mondayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked()
                    }}
                    scrollEnabled={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {tuesdayDayList != null &&
            <View style={{ flex: 1 }}>
              {tuesdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Tuesday</Text>
                  <DayListView
                    dayList={tuesdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked()
                    }}
                    scrollEnabled={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {wednesdayDayList != null &&
            <View style={{ flex: 1 }}>
              {wednesdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Wednesday</Text>
                  <DayListView
                    dayList={wednesdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked()
                    }}
                    scrollEnabled={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {thursdayDayList != null &&
            <View style={{ flex: 1 }}>
              {thursdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Thursday</Text>
                  <DayListView
                    dayList={thursdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked()
                    }}
                    scrollEnabled={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {fridayDayList != null &&
            <View style={{ flex: 1 }}>
              {fridayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Friday</Text>
                  <DayListView
                    dayList={fridayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked()
                    }}
                    scrollEnabled={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {saturdayDayList != null &&
            <View style={{ flex: 1 }}>
              {saturdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Saturday</Text>
                  <DayListView
                    dayList={saturdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked()
                    }}
                    scrollEnabled={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {sundayDayList != null &&
            <View style={{ flex: 1 }}>
              {sundayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Sunday</Text>
                  <DayListView
                    dayList={sundayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked()
                    }}
                    scrollEnabled={false}
                  />
                </View>
              }
            </View>
          }
        </View>
      </ScrollView>
    </View>

  )

}
