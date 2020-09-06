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
import { Card, ListItem, Icon } from 'react-native-elements'

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


export default class AboutUs extends React.Component {
    static navigationOptions = {
      title: 'Logout',
      drawerIcon: () =><Image style={{height: 20, width: 30}} source={require('../assets/LogoutIcon.png')}
                        />
    };

    constructor(props){
      super(props)
      this.state = {
         
        aboutUs:'',
        isLoading: false,
      }
      this.contact = this.contact.bind(this)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
  
    componentWillMount() {



        this.setState({isLoading: true})
        let data = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
          }
        }
    
        fetch('https://easyrentsale.com/api/about_us',data)
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.result){
                console.log(responseJson.result)
              this.setState({
                 aboutUs:responseJson.data.about_us,
                isLoading: false})
               
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
        
        <Card >
  
    
  
        <View>
          
          <Text style={styles.name}>
         {this.state.aboutUs}
              </Text>
        </View>
      
</Card>
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