// a function to save a real task to cache by ID

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs task as JSON object with ID
//outputs nothing

export default (task) => {
  //task has name,description and id as string
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem("TASK" + task.id, JSON.stringify(task), (error) => { resolve() })
  })
}