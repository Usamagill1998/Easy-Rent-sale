import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Image, } from "react-native";
import QuestionsScreen from "./screens/question";
//import AnswersScreen from './screens/answer'
import ProfileScreen from "./screens/profile";
import { Root } from "native-base";
import Nav from './navigator';
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
//import Onboarding from "react-native-onboarding-swiper";
/*redux components*/
import {createStore} from 'redux';
import allReducers from './reducers/index';
import {Provider,} from 'react-redux';
import {firstLaunchCheck} from './actions/index';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
const store=createStore(allReducers);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('./assets/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./assets/native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('./assets/native-base/Fonts/Ionicons.ttf')
    });
    this.setState({ isReady: true });
  }
render() {   
    if (!this.state.isReady){
      return(
        <View>
          <Text>Loading</Text>
        </View>
      )
    }
    else{
      return (
        <Root>
        <Provider store={store}>
          <Nav />
        </Provider>
        </Root>
      );
    }
  }
}


