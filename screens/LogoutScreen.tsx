import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
import LogoutHelper from './LogoutHeloper';
import HomeScreen from './Home';
import { Toast } from 'native-base';


export default class LogoutScreenDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoutHelper/>
        <HomeScreen/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#318080',
    }
}); 