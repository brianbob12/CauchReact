import *  as React from 'react';

import WebWindow from './WebWindow'
import NonWebWindow from "./NonWebWindow"

import SaveTaskToCache from "../../Functions/Tasks/Caching/SaveTaskToCache"
import SaveDayListToCahce from '../../Functions/DayList/SaveDayListToCache';

export default ({ visible, selectedDayLists, onNewTaskReady,
  task, day, onClose }) => {
  let addNewTask = (task, selectedDay) => {
    if (task.id == undefined || task.id == null) {
      task.id = Math.random().toString(32)
    }
    var selectedDayList = selectedDayLists.monday
    if (selectedDay == "tuesday") {
      selectedDayList = selectedDayLists.tuesday
    }
    else if (selectedDay == "wednesday") {
      selectedDayList = selectedDayLists.wednesday
    }
    else if (selectedDay == "thursday") {
      selectedDayList = selectedDayLists.thursday
    }
    else if (selectedDay == "friday") {
      selectedDayList = selectedDayLists.friday
    }
    else if (selectedDay == "saturday") {
      selectedDayList = selectedDayLists.saturday
    }
    else if (selectedDay == "sunday") {
      selectedDayList = selectedDayLists.sunday
    }
    if (!selectedDayList.realTaskIDs.includes(task.id)) {
      selectedDayList.realTaskIDs.push(task.id)
    }
    SaveDayListToCahce(selectedDayList)
    SaveTaskToCache(task).then(onNewTaskReady())
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
        day={day}
      />

    )
  }
}



