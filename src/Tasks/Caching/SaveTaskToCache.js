// a function to save a real task to cache by ID

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs task as JSON object with ID
//outputs nothing

export default async function SaveTaskToCache(task) {
  //task has name,description and id as string

  try {
    await AsyncStorage.setItem(task.id, JSON.stringify(task))
  }
  catch (e) {
    //error
  }
}