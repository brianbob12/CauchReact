//a function to get a dayList from cache by the date 

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs id as string
//outputs JSON object task


export default (date) => {
  // takes date as javascript Date object
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("DAYLIST" + date.toString(36)).then((result) => {
      //TODO deal with error
      resolve(JSON.parse(result))
    })
  })
}