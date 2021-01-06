import *  as React from 'react';
import { DragSortableView } from "react-native-drag-sort";

import { Dimensions, ScrollView, Text, View } from "react-native"
//shows a drag and drop list of all tasks in a given dayList
//must be in a SafeAreaView

//setup variables
const { width } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48
const childrenSpacing = 8

export default class DayListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDayList: props.dayList
    }
  }

  render() {
    return (
      <ScrollView
        ref={(scrollView) => this.scrollView = scrollView}
        scrollEnabled={this.state.scrollEnabled}
        style={{
          paddingTop: 5
        }}
      >
        <DragSortableView
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          dataSource={this.state.selectedDayList.allTaskList}
          sortable={true}
          childrenHeight={childrenHeight}
          childrenWidth={childrenWidth}
          parentWidth={parentWidth}
          renderItem={(item, index) => {
            return this.renderTask(item, index)
          }}
          scaleStatus={'scaleY'}
          onDragStart={(startIndex, endIndex) => {
            this.setState({
              scrollEnabled: false
            })
          }}
          onDragEnd={(startIndex) => {
            this.setState({
              scrollEnabled: true
            })
          }}
          onDataChange={(data) => {
            if (data.length != this.state.data.length) {
              this.setState({
                data: data
              })
            }
          }}
          keyExtractor={(item, index) => item.txt} // FlatList作用一样，优化
          onClickItem={(data, item, index) => { }}
        >
        </DragSortableView>
      </ScrollView>
    );
  }
  renderTask(item, index) {
    return (
      <View
        style={{
          backgroundColor: "#d8d8d8",
          justifyContent: "center",
          alignItems: "center",
          width: childrenWidth - childrenSpacing * 2,
          height: childrenHeight - childrenSpacing,
          marginLeft: childrenSpacing
        }}
      >
        <Text>{item.name}</Text>
      </View>
    )
  }
}