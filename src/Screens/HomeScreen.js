import React, { Component } from "react";
import { Dimensions,SafeAreaView,ScrollView, StyleSheet, Text, View } from "react-native";
import {DragSortableView} from "react-native-drag-sort";
import { Ionicons } from '@expo/vector-icons'
//setup variables
const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48
const childrenSpacing = 8

export default class HomeScreen extends Component{

  constructor(props) {
    super()

    this.state = {
      data: ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"],
      scrollEnabled: true,
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width:"100%",
            height:"7%",
            backgroundColor:"#FFFFFFFF",
            borderBottomColor: "#d8d8d8",
            borderBottomWidth:1,
            justifyContent:"center",
            alignContent:"center",
            flexDirection:"row"
          }}
        >
          <Ionicons name="reorder-four" style={{marginRight:"30%"}} size={35} color="gray"/>
          <Text>Tasks To Do <b>Today</b></Text>
          <Ionicons name="add" style={{marginLeft:"30%"}} size={35} color="gray"/>
        </View>
        <ScrollView
          ref={(scrollView)=> this.scrollView = scrollView}
          scrollEnabled = {this.state.scrollEnabled}
          style={{
            paddingTop:5
          }}
        >
            <DragSortableView
              style ={{
                justifyContent: "center",
                alignItems:"center",
              }}
              dataSource= {this.state.data}
              sortable = {true}
              childrenHeight = {childrenHeight}
              childrenWidth = {childrenWidth}
              parentWidth = {parentWidth}
              renderItem =  {(item,index)=>{
                return this.renderTask(item,index)
              }}
              scaleStatus={'scaleY'}
              onDragStart={(startIndex,endIndex)=>{
                this.setState({
                scrollEnabled: false
                })
              }}
              onDragEnd={(startIndex)=>{
                this.setState({
                scrollEnabled: true
                })
              }}
              onDataChange = {(data)=>{
                if (data.length != this.state.data.length) {
                  this.setState({
                    data: data
                  })
                }
              }}
              keyExtractor={(item,index)=> item.txt} // FlatList作用一样，优化
              onClickItem={(data,item,index)=>{}}
            >
          </DragSortableView>
        </ScrollView>
      </SafeAreaView>
    );
  }
  renderTask(item,index){
    return(
      <View
        style={{
          backgroundColor:"#00FF00FF",
          justifyContent:"center",
          alignItems:"center",
          width:childrenWidth-childrenSpacing*2,
          height:childrenHeight-childrenSpacing,
          marginLeft:childrenSpacing
        }}
      >
        <Text>{item}</Text>
      </View>
    )
  }
}