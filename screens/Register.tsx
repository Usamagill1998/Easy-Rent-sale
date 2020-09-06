import React, { Component } from 'react';
import { TextField } from 'react-native-materialui-textfield';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container,CheckBox, Header, Content, Picker, Form } from "native-base";
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
import Expo from "expo";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class RegisterScreen extends Component {

  constructor(props) {
    super(props);
      this.state = {
        name: '',
        email   : '',
        username: '',
        password: '',
        cpassword: '',
        hidepassword1: true,
        sure: false,
        type: '4',
        hidepassword2: true,
        countries: [],
        cities:[],
        country: '',
        city: '',
        isLoading: false,

      }
      this.register = this.register.bind(this)
  }

  async componentDidMount(){
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "token": ""
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch('https://www.easyrentsale.com/api/countries', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){
          this.setState({countries: responseJson.data.countries})
        }
        else {
          this.setState({isLoading: false})
        }
      })
      .catch((error) =>{
        this.setState({isLoading: false})
      });
    // await Expo.Font.loadAsync({
    //     Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    // });

  }

  updateCity(country){
    this.setState(
      {
        country: country,
        cities: [],
        city: ''
      })
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "country": country
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch('https://www.easyrentsale.com/api/city', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){
          this.setState({cities: responseJson.data.cities})
        }
        else {
        }
      })
      .catch((error) =>{
      });
  }

  register(){
    this.setState({isLoading: true})
    if(this.state.username && this.state.email && this.state.password && this.state.cpassword && this.state.name && this.state.country && this.state.city && this.state.sure && this.state.type){
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          cpassword: this.state.cpassword,
          type: this.state.type,
          country: this.state.country,
          city: this.state.city,
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }
  
      fetch('https://easyrentsale.com/api/register', data)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.result){
            this.setState({isLoading: false})
            const {navigate} = this.props.navigation;
            Toast.show({
              text: 'Registered Successfully',
              buttonText: 'Okay',
              type: "success"
               })
            navigate('LoginStack')

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
        });
    }
    else {
      Toast.show({
              text: 'Please enter all fields',
              buttonText: 'Okay',
              type: "danger"
               })
      this.setState({isLoading: false})

    }

  }



  render() {
    const {navigate} = this.props.navigation;

    let Loading:any = '';
    if (this.state.isLoading) {
      Loading = <DotIndicator style={{top: '50%', position: 'absolute', alignSelf: 'center'}} color='white' />
    }
    else{
      Loading=null
    }
    const countryList = this.state.countries.map((data) => {
      return (
        <Picker.Item label={data.name} value={data.id} />
      )
    })
    const cityList = this.state.cities.map((data) => {
      return (
        <Picker.Item label={data.name} value={data.id} />
      )
    })
    return (

      <ImageBackground source={require('../assets/BG.png')} style={styles.body}>
      {Loading}

      <ScrollView >
          <View style={styles.container}>
            <Image
                source={require('../assets/User.png')}
                resizeMode={'contain'}   /* <= changed  */
                style={{height: 100, top: 20, bottom: 5}}
              />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.2}}>
            <Image source={require('../assets/UserIcon.png')}
              resizeMode={'contain'}   /* <= changed  */
              style={{top: 30, height: 35}} />
            </View>
            <View style={{flex: 0.8}}>
            <TextField
              style={styles.input}
              textColor= 'white'
              tintColor='#F7810A'
              label='Name'
              value={this.state.name}
              onChangeText={ (name) => this.setState({ name }) }
            />
            </View>
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.2}}>
            <Image source={require('../assets/EmailIcon.png')}
              resizeMode={'contain'}   /* <= changed  */
              style={{top: 30, height: 25}} />
            </View>
            <View style={{flex: 0.8}}>
            <TextField
              style={styles.input}
              textColor= 'white'
              tintColor='#F7810A'
              label='Email'
              value={this.state.email}
              onChangeText={ (email) => this.setState({ email }) }
            />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.2}}>
            <Image source={require('../assets/UserIcon.png')}
              resizeMode={'contain'}   /* <= changed  */
              style={{top: 30, height: 35}} />
            </View>
            <View style={{flex: 0.8}}>
            <TextField
              style={styles.input}
              textColor= 'white'
              tintColor='#F7810A'
              label='Username'
              value={this.state.username}
              onChangeText={ (username) => this.setState({ username }) }
            />
            </View>
          </View>
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
                tintColor='#F7810A'
                label='Password'
                secureTextEntry={this.state.hidepassword1}
                value={this.state.password}
                onChangeText={ (password) => this.setState({ password }) }
              />
              <TouchableWithoutFeedback
            onPress={() => this.setState({hidepassword1: !this.state.hidepassword1})}
            >
            
            <Image 
              source={require('../assets/EyeShape.png')}
              resizeMode={'contain'}   /* <= changed  */
              style={{alignSelf: 'flex-end', position:'absolute', top: 25, height: 20}} />
            </TouchableWithoutFeedback>
            </View>
          </View>
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
                tintColor='#F7810A'
                label='Password'
                secureTextEntry={this.state.hidepassword2}
                value={this.state.cpassword}
                onChangeText={ (cpassword) => this.setState({ cpassword }) }
              />
              <TouchableWithoutFeedback
            onPress={() => this.setState({hidepassword2: !this.state.hidepassword2})}
            >
            
            <Image 
              source={require('../assets/EyeShape.png')}
              resizeMode={'contain'}   /* <= changed  */
              style={{alignSelf: 'flex-end', position:'absolute', top: 25, height: 20}} />
            </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', marginTop: 30}}>
            <View style={{alignSelf:'center', borderWidth: 2, borderRadius: 10, borderColor: 'white',  width: '90%'}}>
            <Picker
                  mode="dropdown"
                  placeholder="Select user type"
                  placeholderStyle={{ color: "white" }}
                  selectedValue={this.state.type}
                  textStyle={{color: 'white'}}
                  itemStyle={{backgroundColor:'#fff'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({type: itemValue})
                  }>
              <Picker.Item label="User" value="4" />
              <Picker.Item label="Agent" values="3" />
            </Picker>
            </View>
          </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
              <View style={{width: '40%',marginRight: '5%', alignSelf:'center', borderRadius: 10, borderWidth: 2, borderColor: 'white',}}>
              <Picker
                  mode="dropdown"
                  placeholder="Select your country"
                  placeholderStyle={{ color: "white" }}
                selectedValue={this.state.country}
                textStyle={{borderBottomColor: 'grey', color: 'white'}}
                onValueChange={(itemValue, itemIndex) =>
                  this.updateCity(itemValue)
                }>
                  {countryList}
                </Picker>
              </View>
              <View style={{width: '40%', marginLeft: '5%', borderRadius: 10, alignSelf: 'center', borderWidth: 2, borderColor: 'white',}}>
              <Picker
                  mode="dropdown"
                  placeholder="Select your city"
                  placeholderStyle={{ color: "white" }}
                  placeholderIconColor="white"
                  
                selectedValue={this.state.city}
                textStyle={{ color: 'white'}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({city: itemValue})
                }>
                {cityList}
              </Picker>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 20, justifyContent: 'center'}}>
            <CheckBox
                checked={this.state.sure}
                color="white"
                onPress={() => this.setState({sure: !this.state.sure})}
            />
            <Text style={{left: 20, color: 'white'}}>Are you Sure About that ?</Text>
            </View>
            <View style={{flexDirection: 'row', height: 70, justifyContent: 'center', marginTop: 10}}>
            <TouchableOpacity 
            onPress={this.register}
            style={{borderColor: 'white', borderWidth: 5, borderRadius: 40, height: 50, flex: 15, flexDirection: 'column', padding: 10, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center'}}>
              <Text  style={{padding: 20, alignSelf: 'center'}}>Register</Text>
            </TouchableOpacity>
            </View>


        <View style={{flexDirection: 'row', height: 70, justifyContent: 'center'}}>
              <Text  style={{padding: 20, color: '#C0C0C0', alignSelf: 'center'}}>Already have an account</Text>
        </View>
        <View style={{flexDirection: 'row', height: 70, justifyContent: 'center'}}>
            <TouchableOpacity 
            onPress={()=>navigate('LoginStack')}
            style={{height: 50, flex: 0.5, flexDirection: 'column', borderRadius: 40, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text  style={{padding: 20, alignSelf: 'center', color: 'white'}}>Login</Text>
            </TouchableOpacity>
        </View>



      </ScrollView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    padding: 10,
  },
});