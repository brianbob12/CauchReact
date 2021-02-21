import *  as React from 'react';

import WebWindow from './WebWindow'
import NonWebWindow from "./NonWebWindow"

export default ({ visible, task, day, onClose, addNewTask }) => {

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



