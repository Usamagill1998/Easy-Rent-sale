/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class Loader extends Component {

    constructor(props){
      super(props)
    }
    
    render(){
    const {loading, ...attributes} = this.props;
    return (
      <View style={{backgroundColor: 'grey', height : 150,position: 'absolute',zIndex: 100, width: '90%', left: '5%'}}>
        <Text style={{color: 'white', fontSize: 18, margin: 10}}>{this.props.text}</Text>
        <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
        <ActivityIndicator
                 style={{flex: 0.1}}
                 animating = {true}
                 color = 'green'
                 size = "large"
                 />
                 <Text style={{flex: 0.9,fontSize: 12,color: 'white', alignSelf: 'center', textAlign: 'center'}}>Please wait</Text>
      </View>
      </View>
      )
    }
  
  
  }
  
  