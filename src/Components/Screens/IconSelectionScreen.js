import * as React from "react"
import { StyleSheet, View, Text, Modal, TouchableHighlight, ScrollView, FlatList } from "react-native"
import IconSelector from "../IconSelector/IconSelector.js"

export default ({ visible, onClose }) => {
  let icons = ["add-circle-outline", "add-outline", "airplane-outline",
    "alarm-outline", "albums-outline", "alert-circle-outline", "alert-outline",
    "american-football-outline", "analytics-outline", "aperture-outline", "apps-outline",
    "archive-outline", "arrow-back-circle-outline", "arrow-back-outline", "arrow-down-circle-outline",
    "arrow-down-outline", "arrow-forward-circle-outline", "arrow-forward-outline",
    "arrow-redo-circle-outline", "arrow-redo-outline", "arrow-undo-circle-outline",
    "arrow-undo-outline", "arrow-up-circle-outline", "arrow-up-outline", "at-circle-outline",
    "at-outline", "attach-outline", "backspace-outline",
    "bandage-outline", "bar-chart-outline", "barbell-outline", "barcode-outline", "baseball-outline",
    "basket-outline", "basketball-outline", "battery-charging-outline", "battery-dead-outline",
    "battery-full-outline", "battery-half-outline", "beaker-outline", "bed-outline", "beer-outline",
    "bicycle-outline", "bluetooth-outline", "boat-outline", "body-outline", "bonfire-outline",
    "book-outline", "bookmark-outline", "bookmarks-outline", "briefcase-outline",
    "browsers-outline", "brush-outline", "bug-outline", "build-outline", "bulb-outline", "bus-outline",
    "business-outline", "cafe-outline", "calculator-outline", "calendar-outline", "call-outline", "camera-outline",
    "camera-reverse-outline", "car-outline", "car-sport-outline", "card-outline",
    "caret-back-circle-outline", "caret-back-outline", "caret-down-circle-outline",
    "caret-down-outline", "caret-forward-circle-outline", "caret-forward-outline",
    "caret-up-circle-outline", "caret-up-outline", "cart-outline", "cash-outline", "cellular-outline",
    "chatbox-ellipses-outline", "chatbox-outline", "chatbubble-ellipses-outline", "chatbubble-outline",
    "chatbubbles-outline", "checkbox-outline", "checkmark-circle-outline",
    "checkmark-done-circle-outline", "checkmark-done-outline", "checkmark-outline",
    "chevron-back-circle-outline", "chevron-back-outline", "chevron-down-circle-outline",
    "chevron-down-outline", "chevron-forward-circle-outline", "chevron-forward-outline",
    "chevron-up-circle-outline", "chevron-up-outline", "clipboard-outline", "close-circle-outline",
    "close-outline", "cloud-circle-outline", "cloud-done-outline", "cloud-download-outline",
    "cloud-offline-outline", "cloud-outline", "cloud-upload-outline", "cloudy-night-outline",
    "cloudy-outline", "code-download-outline", "code-outline", "code-slash-outline",
    "code-working-outline", "cog-outline", "color-fill-outline", "color-filter-outline",
    "color-palette-outline", "color-wand-outline", "compass-outline", "construct-outline",
    "contract-outline", "contrast-outline", "copy-outline", "create-outline", "crop-outline",
    "cube-outline", "cut-outline", "desktop-outline", "disc-outline",
    "document-attach-outline", "document-outline", "document-text-outline",
    "documents-outline", "download-outline", "duplicate-outline", "ear-outline", "earth-outline",
    "easel-outline", "egg-outline", "ellipse-outline", "ellipsis-horizontal-circle-outline",
    "ellipsis-horizontal-outline", "ellipsis-vertical-circle-outline", "ellipsis-vertical-outline",
    "enter-outline", "exit-outline", "expand-outline", "eye-off-outline",
    "eye-outline", "eyedrop-outline", "fast-food-outline", "female-outline", "file-tray-full-outline",
    "file-tray-outline", "file-tray-stacked-outline", "film-outline",
    "filter-outline", "finger-print-outline", "fitness-outline", "flag-outline",
    "flame-outline", "flash-off-outline", "flash-outline", "flashlight-outline", "flask-outline",
    "flower-outline", "folder-open-outline", "folder-outline", "football-outline",
    "funnel-outline", "game-controller-outline", "gift-outline", "git-branch-outline",
    "git-commit-outline", "git-compare-outline", "git-merge-outline", "git-network-outline",
    "git-pull-request-outline", "glasses-outline", "globe-outline", "golf-outline", "grid-outline",
    "hammer-outline", "hand-left-outline", "hand-right-outline", "happy-outline",
    "hardware-chip-outline", "headset-outline", "heart-circle-outline", "heart-dislike-circle-outline",
    "heart-dislike-outline", "heart-half-outline", "heart-outline", "help-buoy-outline",
    "help-circle-outline", "home-outline", "hourglass-outline", "ice-cream-outline",
    "image-outline", "images-outline", "infinite-outline",
    "information-circle-outline", "information-outline", "journal-outline",
    "key-outline", "keypad-outline", "language-outline", "laptop-outline", "layers-outline",
    "leaf-outline", "library-outline", "link-outline", "list-circle-outline", "list-outline",
    "locate-outline", "location-outline", "lock-closed-outline", "lock-open-outline", "log-in-outline",
    "log-out-outline", "magnet-outline", "mail-open-outline", "mail-outline", "mail-unread-outline",
    "male-female-outline", "male-outline", "man-outline", "map-outline", "medal-outline",
    "medical-outline", "medkit-outline", "megaphone-outline", "menu-outline", "mic-circle-outline",
    "mic-off-circle-outline", "mic-off-outline", "mic-outline", "moon-outline", "move-outline",
    "musical-note-outline", "musical-notes-outline", "navigate-circle-outline", "navigate-outline",
    "newspaper-outline", "notifications-circle-outline", "notifications-off-circle-outline",
    "notifications-off-outline", "notifications-outline", "nuclear-outline", "nutrition-outline",
    "open-outline", "options-outline", "paper-plane-outline", "partly-sunny-outline", "pause-circle-outline",
    "pause-outline", "paw-outline", "pencil-outline", "people-circle-outline", "people-outline",
    "person-add-outline", "person-circle-outline", "person-outline", "person-remove-outline",
    "phone-landscape-outline", "phone-portrait-outline", "pie-chart-outline", "pin-outline",
    "pint-outline", "pizza-outline", "planet-outline", "play-back-circle-outline", "play-back-outline",
    "play-circle-outline", "play-forward-circle-outline", "play-forward-outline", "play-outline",
    "play-skip-back-circle-outline", "play-skip-back-outline", "play-skip-forward-circle-outline",
    "play-skip-forward-outline", "podium-outline", "power-outline", "pricetag-outline",
    "pricetags-outline", "print-outline", "pulse-outline", "push-outline",
    "qr-code-outline", "radio-button-off-outline", "radio-button-on-outline", "radio-outline",
    "rainy-outline", "reader-outline", "receipt-outline", "recording-outline", "refresh-circle-outline",
    "refresh-outline", "reload-circle-outline", "reload-outline", "remove-circle-outline",
    "remove-outline", "reorder-four-outline", "reorder-three-outline", "reorder-two-outline",
    "repeat-outline", "resize-outline", "restaurant-outline", "return-down-back-outline",
    "return-down-forward-outline", "return-up-back-outline", "return-up-forward-outline",
    "ribbon-outline", "rocket-outline", "rose-outline", "sad-outline", "save-outline",
    "scan-circle-outline", "scan-outline", "school-outline", "search-circle-outline", "search-outline",
    "send-outline", "server-outline", "settings-outline", "shapes-outline", "share-outline",
    "share-social-outline", "shield-checkmark-outline", "shield-outline",
    "shirt-outline", "shuffle-outline", "skull-outline", "snow-outline",
    "speedometer-outline", "square-outline", "star-half-outline", "star-outline", "stats-chart-outline",
    "stop-circle-outline", "stop-outline", "stopwatch-outline", "subway-outline",
    "sunny-outline", "swap-horizontal-outline", "swap-vertical-outline", "sync-circle-outline",
    "sync-outline", "tablet-landscape-outline", "tablet-portrait-outline",
    "tennisball-outline", "terminal-outline", "text-outline", "thermometer-outline",
    "thumbs-down-outline", "thumbs-up-outline", "thunderstorm-outline", "time-outline",
    "timer-outline", "today-outline", "toggle-outline", "trail-sign-outline", "train-outline",
    "transgender-outline", "trash-bin-outline", "trash-outline", "trending-down-outline",
    "trending-up-outline", "triangle-outline", "trophy-outline", "tv-outline", "umbrella-outline",
    "videocam-outline", "volume-high-outline",
    "volume-low-outline", "volume-medium-outline", "volume-mute-outline", "volume-off-outline",
    "walk-outline", "wallet-outline", "warning-outline", "watch-outline", "water-outline", "wifi-outline",
    "wine-outline", "woman-outline"]
  const listOfRows = []
  const iconsPerRow = 5
  for (i = 0; i < icons.length; i += iconsPerRow) {
    listOfRows.push(i)
  }
  return (
    <View style={{ position: "absolute" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={{
          flex: 1, justifyContent: "center", alignItems: "stretch",
          backgroundColor: "white"
        }}
        >
          <View style={{ flex: 1, flexDirection: "column", alignItems: "stretch", justifyContent: "center" }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}>
              <TouchableHighlight
                onPress={() => {
                  //I may want to add args to this later
                  onClose()
                }}
                style={{
                  backgroundColor: "#c5c5c5",
                  borderRadius: 20,
                  margin: 15,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 70,
                  height: 30
                }}
              >
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flex: 4, flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch" }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                <Text style={{}}>Free Icons</Text>
              </View>
              <View style={{ flex: 2, flexDirection: "row", justifyContent: "space-around" }}>
                <IconSelector iconName={"book-outline"} onPress={() => { onClose("book-outline") }} locked={false} />
                <IconSelector iconName={"barbell-outline"} onPress={() => { onClose("barbell-outline") }} locked={false} />
                <IconSelector iconName={"school-outline"} onPress={() => { onClose("school-outline") }} locked={false} />
                <IconSelector iconName={"brush-outline"} onPress={() => { onClose("brush-outline") }} locked={false} />
                <IconSelector iconName={"calculator-outline"} onPress={() => { onClose("calculator-outline") }} locked={false} />
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text>Premium Icons</Text>
            </View>
            <View style={{ flex: 16 }}>
              <FlatList
                style={{ flex: 1 }}
                data={listOfRows}
                renderItem={(item) => {
                  const toRender = []
                  for (var i = item.item; i < item.item + iconsPerRow; i++) {
                    toRender.push(icons[i])
                  }
                  return (
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      {toRender.map(icon => {
                        return (
                          <View style={{ width: 60, justifyContent: "center", alignItems: "center" }}>
                            <IconSelector iconName={icon} onPress={() => { }} locked={true} />
                          </View>
                        )
                      })}
                    </View>
                  )
                }}
              />
            </View>
          </View>
        </View>
      </Modal >
    </View >
  )
}