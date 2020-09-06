import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";


import {createStackNavigator, createAppContainer} from 'react-navigation';


class AnswersScreen extends React.Component{
  constructor(props){
    super(props)
    console.log(this.props)
  }
  static navigationOptions = {
      title: 'Answers',
    };
    render() {

      const {navigate} = this.props.navigation;
      return (
        <View>
          <Text style={{textAlign:"center"}}>This is answer screen {this.props.facebookToken.FirstLaunchCheck}</Text>
          <View>
        <Button
          title="Go to Questions"
          onPress={() => navigate('Questions')}
        />

<Button
          title="asdd"
          onPress={() => this.props.dispatch(firstLaunchCheck("4343"))}
        />

        </View>

<Button
          title="+"
          onPress={() => this.props.dispatch(INC())}
        />

<Button
          title="-"
          onPress={() => this.props.dispatch(DEC())}
        />
        </View>
      );
    }
}


function mapStateToProps(state) {
  return {
      facebookToken: state
  }
}
const mapDispatchToEvents = (dispatch) => {
  return {
    dispatch,
    firstLaunchCheck
  };
};
export default connect(mapStateToProps, mapDispatchToEvents)(AnswersScreen)


// export default AnswersScreen;