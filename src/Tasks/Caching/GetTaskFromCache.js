//a function to get a real task from cache by ID

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs id as string
//outputs JSON object task


export default async function GetTaskFromCache(id) {
  //id as string

  try {
    const value = await AsyncStorage.getItem(id)
    if (value == null) {
      //no value is stored
      return null//deal with this later
    }
    else {
      return JSON.parse(value)
    }
  }
  catch (e) {
    // error reading value
    return null
  }

}