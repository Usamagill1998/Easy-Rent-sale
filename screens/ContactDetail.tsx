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
  Input,
  BackHandler,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator
} from 'react-native';
import { TextField } from 'react-native-materialui-textfield';
import Loader from './LoaderScreen';
import { Constants } from 'expo';
import * as ImagePicker from 'expo-image-picker'
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


export default class ContactDetailScreen extends React.Component {
    static navigationOptions = {
      title: 'Logout',
      drawerIcon: () =><Image style={{height: 20, width: 30}} source={require('../assets/LogoutIcon.png')}
                        />
    };

    constructor(props){
      super(props)
      this.state = {
        pickerResult: null,
        email: '',
        phone: '',
        addid: '',
        name: '',
        message: '',
        isLoading: false,
      }
      this.contact = this.contact.bind(this)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
  
    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    handleBackButtonClick() {
      this.props.navigation.navigate('Home');
      return true;
    }

    _pickImg = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: false,
        aspect: [4, 3],
      });
  
      this.setState({
        pickerResult,
      });
    };

    contact(){
      if(this.state.email == ''){
        return
      }
      else if(this.state.message == ''){
        return
      }
      this.setState({isLoading: true})
      const {navigate} = this.props.navigation;
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          "name": this.state.name,
          "email": this.state.email,
          "phone": this.state.phone,
          "message": this.state.message,
          "addid": this.state.addid,

        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }
  
      fetch('https://www.easyrentsale.com/api/contact', data)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.result){
            this.setState({isLoading: false})
             Toast.show({
              text: 'Mail Sent',
              buttonText: 'Okay',
              type: "success"
               })
            navigate('Home')
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
    
    }

    
    render() {
      let Loading:any = '';
      if (this.state.isLoading) {
        Loading =  <DotIndicator style={{top: '50%', position: 'absolute', alignSelf: 'center'}} color='white' />
      }
      else{
        Loading=null;
      }
      let { pickerResult } = this.state;
      let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
    
      
      const {navigate} = this.props.navigation;
      return (
        <ImageBackground source={require('../assets/BG.png')} style={styles.body}>
        <View style={{padding: 5, flex: 1 }}>
           <TextInput
              style={{color: 'white', width: '100%', padding: 5, margin: 5, borderWidth: 2, borderRadius: 10, borderColor: 'grey'}}
              placeholder="Name"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
            <TextInput
              style={{color: 'white',width: '100%', padding: 5, margin: 5, borderWidth: 2, borderRadius: 10, borderColor: 'grey'}}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              style={{color: 'white', width: '100%', padding: 5, margin: 5, borderWidth: 2, borderRadius: 10, borderColor: 'grey'}}
              placeholder="AD ID"
              onChangeText={(adid) => this.setState({adid})}
              value={this.state.adid}
            />
            <TextInput
              style={{color: 'white', width: '100%', padding: 5, margin: 5, borderWidth: 2, borderRadius: 10, borderColor: 'grey'}}
              placeholder="Phone"
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
            />
            <TextInput
              multiline={true}
              placeholder="Message"
              numberOfLines={4}
              style={{color: 'white', width: '100%', padding: 5, margin: 5, borderWidth: 2, borderRadius: 10, borderColor: 'grey'}}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}/>
              {Loading}

            <View style={{flexDirection: 'row', height: 70, padding : 10}}>
                <TouchableOpacity 
                onPress={this.contact}
                style={{flex: 1,borderColor: 'white', borderWidth: 5, borderRadius: 40, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{alignSelf: 'center'}}>Send</Text>
                </TouchableOpacity>
            </View>

        </View>
        </ImageBackground>

      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  },
  body: {
    flex: 1,
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});