import * as SecureStore from "expo-secure-store"

const mySecureAuthStateKey = "CAUCHSECUREGOOGLEAUTHKEY"

//a function to get an oauth token from storage
//returns null if no token exsists or if token is invalid
export default () => {
  return (new Promise((resolve, reject) => {
    SecureStore.getItemAsync(mySecureAuthStateKey).then((value) => {
      //Zde zkontrolujte, zda je token zastaralý

      resolve(value)
    })
  }))
}