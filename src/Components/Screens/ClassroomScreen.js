import * as React from "react"
import * as Google from "expo-auth-session/providers/google";
import { Button, View, Alert } from "react-native";

import GetClassworkToDoFromClass from "../../GoogleClassroomInterface/GetClassworkToDoFromClass.js"

//no support for web

export default () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "381358659790-9680a49o9vg97sm2r9es2r0r6f5ns4hf.apps.googleusercontent.com",
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',//need to fill this in
    androidClientId: "381358659790-skh9360vm3lgf8jl8e2v8r3fnvmtt3u8.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.coursework.me.readonly"],
  })
  console.log("start")
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      Alert.alert("oath response", JSON.stringify(response))
      authentication.
        GetClassworkToDoFromClass(authentication.accessToken, "152492025944").then(
          (val) => {
            console.log(val.length)
            Alert.alert("number of applicable tasks", val.length.toString())
          }
        )
    }
  }, [response]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }} />
    </View>
  );
}