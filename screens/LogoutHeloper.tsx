
import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import HomeScreen from './Home'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import { Toast } from 'native-base';

import { withNavigation } from 'react-navigation';

class LogoutHelper extends Component {

    constructor(props){
      super(props)
      this.logout = this.logout.bind(this) 
    }

    async logout(){
      let data  = {loggedIn: false}
      this.props.dispatch(firstLaunchCheck(data))
      try {
        await AsyncStorage.multiSet([['user_id', ""], ["token",""], ["loggedIn", ""]], (err, data) => {
        });
      } catch (error) {
        // Error saving data
      }
      const {navigate} = this.props.navigation;
      navigate('LoginStack')
    }
    
    render(){
    const {navigate} = this.props.navigation;
    return (
            <View style={{top:'30%', jusifyContent: 'center', backgroundColor: 'grey', height : 150,position: 'absolute',zIndex: 100, width: '90%', left: '5%'}}>
                <Text style={{color: 'white', fontSize: 24, margin: 10, alignSelf: 'center' }}>Are You sure you want to exit ?</Text>
                <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                    <View style={{flex: 0.5}}>
                        <TouchableWithoutFeedback 
                            onPress={()=> navigate('Home')}>
                        <Text style={{fontSize: 18,color: 'white', color: 'red' , alignSelf: 'center'}}>Cancel</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flex: 0.5}}>
                        <TouchableWithoutFeedback
                        onPress={this.logout}>
                            <Text style={{fontSize: 18,color: 'white', color: 'green', alignSelf: 'center'}}>Yes</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>

      )
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
export default connect(mapStateToProps, mapDispatchToEvents)(withNavigation(LogoutHelper))

;