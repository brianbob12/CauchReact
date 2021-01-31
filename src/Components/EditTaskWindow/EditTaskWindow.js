import *  as React from 'react';

import WebWindow from './WebWindow'
import NonWebWindow from "./NonWebWindow"

import SaveTaskToCache from "../../Functions/Tasks/Caching/SaveTaskToCache"
import SaveDayListToCahce from '../../Functions/DayList/SaveDayListToCache';

export default ({ visible, mondayDayList, tuesdayDayList, wednesdayDayList,
  thursdayDayList, fridayDayList, saturdayDayList, sundayDayList, onNewTaskReady,
  task, onClose }) => {
  let addNewTask = (task, selectedDay) => {
    if (task.id == undefined || task.id == null) {
      task.id = Math.random().toString(32)
    }
    SaveTaskToCache(task).then(onNewTaskReady(selectedDay))
    var selectedDayList = mondayDayList
    if (selectedDay == "tuesday") {
      selectedDayList = tuesdayDayList
    }
    else if (selectedDay == "wednesday") {
      selectedDayList = wednesdayDayList
    }
    else if (selectedDay == "thursday") {
      selectedDayList = thursdayDayList
    }
    else if (selectedDay == "friday") {
      selectedDayList = fridayDayList
    }
    else if (selectedDay == "saturday") {
      selectedDayList = saturdayDayList
    }
    else if (selectedDay == "sunday") {
      selectedDayList = sundayDayList
    }
    if (!selectedDayList.realTaskIDs.includes(task.id)) {
      selectedDayList.realTaskIDs.push(task.id)
    }
    SaveDayListToCahce(selectedDayList)
  }
  let myTask = task
  if (task == null || task == undefined) {
    myTask = {
      name: "New Task",
      description: "Description Of Task"
    }
  }
  if (typeof document != "undefined") {
    return (
      <WebWindow visible={visible} />
    )
  }
  else {
    return (
      <NonWebWindow
        visible={visible}
        onClose={(visible, task, selectedDay) => {
          //task is null if process was cancelled
          if (task != null) {

            addNewTask(task, selectedDay)
          }
          onClose(visible)
        }
        }
        task={myTask}
      />

    )
  }
}



