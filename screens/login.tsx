/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import { Toast } from 'native-base';

import React, {Fragment, Component} from 'react';
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
  ImageBackground,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  ActivityIndicator
} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
import Loader from './LoaderScreen';
import { withNavigation } from 'react-navigation';
import {AsyncStorage} from 'react-native';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';


class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.login = this.login.bind(this);
    this.change = this.change.bind(this);
    
    this.state = {
      email   : '',
      password: '',
      isLoading: false,
      hidePassword: true, 
      emailRequired: false,
      passwordRequired: false,
      isAppReady: false,
    }
  }

  componentDidMount(){
    const {navigate} = this.props.navigation;
    AsyncStorage.multiGet(['user_id', "token", "loggedIn"], (err, data) => {
      this.setState({isAppReady: true})
      if(data[0][1] != '' && data[0][1] != undefined && data[0][1] != null)
      {
        let user_id = parseInt(data[0][1])
        let token = data[1][1].toString()
        this.props.dispatch(firstLaunchCheck({"loggedIn": true,"token": token, "user_id": user_id}))
        navigate('Home_')

      }



      ``
    });
  }

  blur(){
    if (!this.state.email){
      this.setState({emailRequired: true})
    }    
    if (!this.state.email){
      this.setState({passwordRequired: true})
    } 
  }

  focus(){
    if (this.state.email){
      this.setState({emailRequired: false})
    }
    if (this.state.password){
      this.setState({passwordRequired: false})
    }
  }

  login(){
    const {navigate} = this.props.navigation;
    if(this.state.email == ''){
      Toast.show({
              text: 'Enter Username!',
              buttonText: 'Okay',
              type: "danger"
       })
      return
    }
    else if(this.state.password == ''){
      Toast.show({
              text: 'Enter Password!',
              buttonText: 'Okay',
              type: "danger"
       })
      return
    }
    //else 
    this.setState({isLoading: true})
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "username": this.state.email,
        "password": this.state.password
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch('https://easyrentsale.com/api/login', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){
          this.setState({isLoading: false})
          try {
            AsyncStorage.multiSet([['user_id', responseJson.data.user_id.toString()], ["token",responseJson.data.token], ["loggedIn", "true"]], (err, data) => {
            });
          } catch (error) {
            // Error saving data
          }
          this.props.dispatch(firstLaunchCheck({"loggedIn": true,"token": responseJson.data.token, "user_id": responseJson.data.user_id}))
          navigate('Home_')
        }
        else {
          Toast.show({
              text: responseJson.error,
              buttonText: 'Okay',
              type: "danger"
       })
          this.setState({isLoading: false})
        }
      })
      .catch((error) =>{
        this.setState({isLoading: false})
        console.error(error);
      });

    // 

  }

  change(){
    this.setState({hidePassword: !this.state.hidePassword})
  }


  


  render() {
    const {navigate} = this.props.navigation;

    let Loading:any = '';
    if (this.state.isLoading) {
      Loading = <DotIndicator style={{top: '50%', position: 'absolute', alignSelf: 'center'}} color='white' />
    }
    else{
      Loading=null;
    }
  if(!this.state.isAppReady){
    return (
      <View style={{backgroundColor: '#318080', justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Image
          resizeMode={'contain'}   /* <= changed  */
          style={{height: '100%', width: '100%'}}
          source={require('../assets/splash.png')}
        />
      </View>
    )
  }
  else{

  return (

    <ImageBackground source={require('../assets/BG.png')} style={styles.body}>
      
      <View style={styles.container}>
      <Image
          source={require('../assets/Logo.png')}
                resizeMode={'contain'}   /* <= changed  */
          style={{ height: 150, top: 30, bottom: 20}}
        />
      </View>
      <View style={{flex: 3}}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={{flex: 0.2}}>
              <Image source={require('../assets/UserIcon.png')}
                resizeMode={'contain'}   /* <= changed  */
                style={{top: 30, height: 35}} />
          </View>
          <View style={{flex: 0.8}}>

          <TextField
            style={styles.input}
            textColor='green' 
            label='User Name'
            tintColor='#F7810A'
            value={this.state.email}
            onChangeText={ (email) => this.setState({ email }) }
          />
          </View>
        </View>
        {Loading}

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.2}}>
          <Image source={require('../assets/LockIcon.png')}
               resizeMode={'contain'}   /* <= changed  */
               style={{top: 30, height: 35}} />
        </View>
          <View style={{flex: 0.8}}>
            
            <TextField
            
              style={styles.input}  
              textColor= 'white'
              label='Password'
              tintColor='#F7810A'
              secureTextEntry={this.state.hidePassword}
              value={this.state.password}
              onChangeText={ (password) => this.setState({ password }) }
            />
            <TouchableWithoutFeedback
            onPress={this.change}
            >
            
            <Image 
              source={require('../assets/EyeShape.png')}
              resizeMode={'contain'}   /* <= changed  */
              style={{alignSelf: 'flex-end', position:'absolute', top: 25, height: 20}} />
            </TouchableWithoutFeedback>  
          </View>

        </View>
        <View style={{flexDirection: 'row', height: 70, padding : 10}}>
            <TouchableOpacity 
            onPress={this.login}
            style={{flex: 1,borderColor: 'white', borderWidth: 5, borderRadius: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center'}}>Login</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableWithoutFeedback 
            onPress={() => navigate('ForgotPasswordStack')}>
              <Text style={{padding: 10, color: 'white', alignSelf: 'center'}}>Forgot Password?</Text>
            </TouchableWithoutFeedback>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text  style={{padding: 10, color: '#C0C0C0'}}>Don't Have account?</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableWithoutFeedback 
            onPress={() => navigate('RegisterStack')}>
              <Text  style={{padding: 10, color: 'white', alignSelf: 'center'}}>Register</Text>
            </TouchableWithoutFeedback>
        </View>
        
      </View>
      
      </ImageBackground>
  );
  }
}  

};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateImage: {
    width: 5,
    alignSelf: 'flex-end',
    top: -70,
    right: 20,
    color: 'black',

    height: 40,
    transform: [{ rotate: '135deg' }], /* change the deg (degree of rotation) between 0deg, 360deg*/
  },
  input: {
    color: 'white',

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  lottie: {
    width: 100,
    height: 100
  },
  body: {
    flex: 1,
    padding: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',
    backgroundColor: 'white'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
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
export default connect(mapStateToProps, mapDispatchToEvents)(withNavigation(LoginScreen))

