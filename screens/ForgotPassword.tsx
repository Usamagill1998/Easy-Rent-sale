/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Alert,
  Image,
  ImageBackground,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator
} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import Loader from './LoaderScreen';
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
import { Toast } from 'native-base';

export default class ForgotPasswordScreen extends Component {

  constructor(props) {
    super(props);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.reset = this.reset.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    
    this.state = {
      email   : '',
      isLoading: false,
      isEmail: true,
    }
  }

  blur(){
    if (!this.state.email){
      this.setState({emailRequired: true})
    }
  }

  focus(){
    if (this.state.email){
      this.setState({emailRequired: false})
    }
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( re.test(email) == true){
      this.setState({isEmail: true})
    }
    else{
      this.setState({isEmail: false})
    }
    this.setState({email: email})
    return re.test(email);
  };

  reset(){
    if (this.state.isEmail == false){
      return
    }
    this.setState({isLoading: true})
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "email": this.state.email,
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch('https://easyrentsale.com/api/forgot-password', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){
          Toast.show({
              text: 'Please check your Email',
              buttonText: 'Okay',
              type: "success"
               })
          this.setState({isLoading: false})
          this.props.navigation.navigate('LoginStack')
        }
        else {
          Toast.show({
              text: 'Error',
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

  render() {
    const {navigate} = this.props.navigation;
    let error:any = '';
    if (this.state.isEmail == false){
      error = <View style={{position: 'absolute', right: '0%'}}><Text style={{color: 'red', backgroundColor: 'grey', padding: 5}}>Invalid email</Text><Image style={{height: 30, width: 30, left: '50%'}} source={require('../assets/invalid.png')}/></View>
    }
    else{
      error=<Text></Text>;
    }

    let Loading:any = '';
    if (this.state.isLoading) {
      Loading = <DotIndicator style={{top: '50%', position: 'absolute', alignSelf: 'center'}} color='white' />
    }
    else{
      Loading=null;
    }
    let back ="<<BACK"

  return (

    <ImageBackground source={require('../assets/BG.png')} style={styles.body}>
      
      <View style={styles.container}>
      <Image
          source={require('../assets/Logo.png')}
          resizeMode={'contain'}   /* <= changed  */
          style={{height: 150, top: 10, bottom: 5}}
        />
      </View>
      <View style={{flex: 3}}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={{flex: 0.2, height: 30}}>
              <Image source={require('../assets/UserIcon.png')}
              resizeMode={'contain'}   /* <= changed  */
              style={{top: 50, height: 35}} />
          </View>
          <View style={{flex: 0.8}}>
            {error}
          <TextField
            style={styles.input}
            textColor= 'white'
            tintColor='#F7810A'
            label='Email'
            value={this.state.email}
            onChangeText={ (email) => this.validateEmail(email) }
          />
          </View>
        </View>
        {Loading}

        <View style={{flexDirection: 'row', height: 70, padding : 10}}>
            <TouchableOpacity 
            onPress={this.reset}
            style={{flex: 1,borderColor: 'white', borderWidth: 5, borderRadius: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center'}}>Reset Password</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1 }}
            onPress={()=>navigate('LoginStack')}
            >
              <Text style={{padding: 10, color: 'orange', alignSelf: 'center'}}> {back}</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
  );
  }
};

const styles = StyleSheet.create({
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

