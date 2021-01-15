// a function to save a daylist to chace by date 

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs task as JSON object with day as Date 
//outputs nothing

export default (dayList) => {

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem("DAYLIST" + dayList.day.toString(36), JSON.stringify(dayList), (error) => { resolve() })
  })
}