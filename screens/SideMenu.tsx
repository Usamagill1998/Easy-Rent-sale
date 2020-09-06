import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Alert,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    createSwitchNavigator,
    DrawerItems,
  } from "react-navigation";
import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
import Loader from './LoaderScreen';


class SideMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          showLogout: false,
          data: {}
        }
        this.logoutFunc = this.logoutFunc.bind(this)
        this.edit = this.edit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.facebookToken.FirstLaunchCheck.profile !==  this.props.facebookToken.FirstLaunchCheck.profile || this.props.facebookToken.FirstLaunchCheck.name != nextProps.facebookToken.FirstLaunchCheck.name || this.props.facebookToken.FirstLaunchCheck.mobile_no != nextProps.facebookToken.FirstLaunchCheck.mobile_no) {
        this.updateData()
      }
  }

  updateData(){
    let user_data = this.props.facebookToken.FirstLaunchCheck
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          token: user_data.token,
          user_id: user_data.user_id
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }
  
      fetch('https://www.easyrentsale.com/api/profile', data)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.result){
            this.setState({data: responseJson.data})
          }
          else {
            this.setState({isLoading: false})
          }
        })
        .catch((error) =>{
          this.setState({isLoading: false})
        });
  
  }

    
  componentDidMount(){
    AsyncStorage.multiGet(['user_id', "token", "loggedIn"], (err, data) => {
      this.setState({isAppReady: true})
      if(data[0][1] != '' && data[0][1] != undefined && data[0][1] != null)
      {
        let user_id = parseInt(data[0][1])
        let token = data[1][1].toString()
        this.props.dispatch(firstLaunchCheck({"loggedIn": true,"token": token, "user_id": user_id}))
        this.updateData()
      }
    });
    
    }

    logoutFunc(){
        this.props.dispatch(INC(true))
        const {navigate} = this.props.navigation;
        navigate('Home')
        // this.props.navigate('Home_')
    }

    edit(){
      const {navigate} = this.props.navigation;
      const result = Object.assign({}, this.state.data, this.props.facebookToken.FirstLaunchCheck);
      this.props.dispatch(firstLaunchCheck(result))
      navigate('EditStack')
    }


    render() {
      const {navigate} = this.props.navigation;
      let edit = <TouchableWithoutFeedback
      onPress={()=> this.edit()}
      >
      <Image
        style={{height: 30, width: 30}} 
        source={require("../assets/EditIcon.png")}>
      </Image>
      </TouchableWithoutFeedback>

        return (
            <View style={styles.container}>
              <ScrollView>
                <View style={{flexDirection: 'row', height: 150, padding: 29,paddingBottom:18, backgroundColor: '#194B48'}}>
                  <View style={{flex: 0.5}}>
                    <Image
                      source={this.props.facebookToken.FirstLaunchCheck.loggedIn ? {uri: this.state.data.profile}: require('../assets/User.png')}
                      style={{height: 85, width: 85, borderRadius: 85/2, borderColor: 'white', borderWidth: 3}}
                    />
                  </View>
                  <View style={{flex: 0.5, justifyContent:'center'}}>
                    <Text style={{color: 'white'}}>{this.state.data.name}</Text>
                    <Text style={{color: 'white'}}>{this.state.data.mobile_no}</Text>
                    <View style={{alignSelf: 'flex-end', margin: 10}}>
                      {this.props.facebookToken.FirstLaunchCheck.loggedIn && edit}
                    </View>
                  </View>
                </View>
                <View style={styles.innerContainer}>
                    <SafeAreaView>
                      <DrawerItems labelStyle={{width: '100%'}} {...this.props} style={{width: '100%'}} />
                    </SafeAreaView>
                </View>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                <View style={{padding: 10}}>
                  <Text style={{color: 'orange', fontWeight: 'bold', fontSize: 18}}>Coming Soon</Text>
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                    <View style={{flex: 0.25}}>
                    <Image style={{height: 25, width: 25}} source={require('../assets/EasyTaxi.png')}
                        />
                    </View>
                    <View style={{flex: 0.75}}>
                      <Text>Easy Taxi</Text>
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                    <View style={{flex: .25}}>
                    <Image style={{height: 25, width: 50}} source={require('../assets/HomeDelevery.png')}
                        />
                    </View>
                    <View style={{flex: 0.75}}>
                      <Text>Easy Home Delivery</Text>
                    </View>
                  </View>
                  </View>
                  <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                    <View style={{padding: 10}}>
                      
                    <TouchableWithoutFeedback 
                      onPress={() => navigate('ContactDetail')}>
                      <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                        <View style={{flex: 0.25}}>
                        <Image style={{height: 25, width: 25}} source={require('../assets/ContactUS.png')}
                            />
                        </View>
                        <View style={{flex: 0.75}}>
                          <Text>Contact Us</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback 
                      onPress={() => navigate('AboutUs')}>
                      <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                        <View style={{flex: 0.25}}>
                        <Image style={{height: 25, width: 25}} source={require('../assets/ContactUS.png')}
                            />
                        </View>
                        <View style={{flex: 0.75}}>
                          <Text>About Us</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                       
                    <TouchableWithoutFeedback 
                    
                       onPress={() => navigate('Logout')}>
                          {(this.props.facebookToken.FirstLaunchCheck.loggedIn)?
                      <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                      {this.props.facebookToken.FirstLaunchCheck.loggedIn}
                                        
                        <View style={{flex: 0.25}}>
                        <Image style={{height: 25, width: 25}} source={require('../assets/LogoutIcon.png')}
                             />
                        </View>
                        <View style={{flex: 0.75}}>
                          <Text>Logout</Text>
                        </View>
                      </View>:<Text></Text>} 
                    </TouchableWithoutFeedback>


                    </View>
              </ScrollView>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    item:{
        color:"black",
        marginTop:20,
        marginBottom:20,
        marginLeft:20,
        fontWeight:"bold",
    },
    container:{
        flex:1,
    },
    innerContainer:{
        flex:1,
    },
    ImageIN:{
        flex:0.5,
        marginLeft:35,
        width:80,
        height:80,
        marginBottom:30,
        marginTop:10,
    }
})


function mapStateToProps(state) {
    return {
        facebookToken: state
    }
  }
  const mapDispatchToEvents = (dispatch) => {
    return {
      dispatch,
      INC,
      firstLaunchCheck
    };
  };
  export default connect(mapStateToProps, mapDispatchToEvents)(SideMenu)