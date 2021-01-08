//a function to get a real task from cache by ID

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs id as string
//outputs JSON object task


export default (id) => {
  //id as string
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(id).then((result) => {
      //TODO deal with error
      resolve(JSON.parse(result))
      //resolve({ name: "test", description: "descript", id: "id" })
    })
  })
}