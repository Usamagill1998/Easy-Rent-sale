import React from 'react';
import { StyleSheet, Text, View, Button, Image, BackHandler, AsyncStorage,TouchableWithoutFeedback } from 'react-native';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Toast } from 'native-base';
import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
import Loader from './LoaderScreen';
import { withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';
import {Header} from 'react-native-elements'

export class ProfileScreen extends React.Component {
    static navigationOptions = {
      title: 'My Ads',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/MyAdsIcon.png')}
                        />
    };

    constructor(props){
      super(props)  
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount(){
      const {navigate} = this.props.navigation;
      AsyncStorage.multiGet(['user_id', "token", "loggedIn"], (err, data) => {
        this.setState({isAppReady: true})
        if(data[0][1] != '' && data[0][1] != undefined && data[0][1] != null)
        {
          //Do Nothing
        }
        else{
          navigate('LoginStack')
        }
      });
    }
  
    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    handleBackButtonClick() {
      this.props.navigation.openDrawer();
      return true;
    }

    
    render() {
      const {navigate} = this.props.navigation;
      return (



        // <View style={{flex: 1,
        //   justifyContent: 'center',
        //   paddingTop:20,
        //   backgroundColor: '#ecf0f1',
        //   padding: 8,}}>
        // <Text style={{marginTop:40}}>Test Test Test Test Test </Text>
          




        
        <View style={{flex: 1,
          justifyContent: 'center',
          paddingTop:20,
          backgroundColor: '#ecf0f1',
          paddingTop: 8,
          
        }
          }>
  <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.openDrawer()
            
            }
        >
       <Text style={{marginLeft:10,marginTop:40}}>

         Cancel
       </Text>
       </TouchableWithoutFeedback>
        <WebView
          source={{uri: 'https://easyrentsale.com/user/Admin?token=' + this.props.facebookToken.FirstLaunchCheck.token}}
          style={{marginTop:20}}
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
export default connect(mapStateToProps, mapDispatchToEvents)(withNavigation(ProfileScreen))
     
  

export class PricingScreen extends React.Component {
    static navigationOptions = {
      title: 'Pricing',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/PricingIcon.png')}
                        />
    };

    constructor(props){
      super(props)  
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount(){
      const {navigate} = this.props.navigation;
      AsyncStorage.multiGet(['user_id', "token", "loggedIn"], (err, data) => {
        this.setState({isAppReady: true})
        if(data[0][1] != '' && data[0][1] != undefined && data[0][1] != null)
        {
          //Do Nothing
        }
        else{
          navigate('LoginStack')
        }
      });
    }
  
    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    handleBackButtonClick() {
      this.props.navigation.openDrawer();
      return true;
    }

    render() {
      const {navigate} = this.props.navigation;
      return (


        
        <View style={{flex: 1,
          justifyContent: 'center',
          paddingTop:20,
          backgroundColor: '#ecf0f1',
          paddingTop: 8,
          
        }
          }>
  <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.openDrawer()
            
            }
        >
       <Text style={{marginLeft:10,marginTop:40}}>

         Cancel
       </Text>
       </TouchableWithoutFeedback>
        <WebView
        source={{uri: 'https://easyrentsale.com/pricing?token=' 
      //  + this.props.facebookToken.FirstLaunchCheck.token
      }}
        style={{marginTop: 10}}
      />
      </View>
      );
    }
  }

  export class AdsPostingScreen extends React.Component {
    static navigationOptions = {
      title: 'Ads Posting',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/AdPostingIcon.png')}
                        />
    };
    constructor(props){
      super(props)  
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount(){
      const {navigate} = this.props.navigation;
      AsyncStorage.multiGet(['user_id', "token", "loggedIn"], (err, data) => {
        this.setState({isAppReady: true})
        if(data[0][1] != '' && data[0][1] != undefined && data[0][1] != null)
        {
          //Do Nothing
        }
        else{
          navigate('LoginStack')
        }
      });
    }
  
    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    handleBackButtonClick() {
      this.props.navigation.openDrawer();
      return true;
    }

    
    render() {
      return (


                <View style={{flex: 1,
          justifyContent: 'center',
          paddingTop:20,
          backgroundColor: '#ecf0f1',
          paddingTop: 8,
          
        }
          }>
  <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.openDrawer()
            
            }
        >
       <Text style={{marginLeft:10,marginTop:40}}>

         Cancel
       </Text>
       </TouchableWithoutFeedback>

       {/* <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>   */}
        
        <WebView
          source={{uri: 'https://easyrentsale.com/product/add?token=' 
        //  + this.props.facebookToken.FirstLaunchCheck.token
        }}
          style={{}}
        />
        </View>
      );
    }
  }

  export class EasiTaxiScreen extends React.Component {
    static navigationOptions = {
      title: 'Easy Taxi',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/EasyTaxi.png')}
                        />
    };


    
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{marginTop:30,}}>
        <Text>This is Me hii.</Text> 
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Info"
          color="#222"
        />
        </View>
      );
    }
  }


  export class EasyHomeDeliveryScreen extends React.Component {
    static navigationOptions = {
      title: 'Easy Home Delivery',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/HomeDelevery.png')}
                        />
    };


    
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{marginTop:30,}}>
        <Text>This is Me hii.</Text> 
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Info"
          color="#222"
        />
        </View>
      );
    }
  }


  export class ContactUSScreen extends React.Component {
    static navigationOptions = {
      title: 'Contact Us',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/ContactUS.png')}
                        />
    };

    
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{marginTop:30,}}>
        <Text>This is Me hii.</Text> 
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Info"
          color="#222"
        />
        </View>
      );
    }
  }
  export class ContactUSScreen2 extends React.Component {
    static navigationOptions = {
      title: 'About Us',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/ContactUS.png')}
                        />
    };

    
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{marginTop:30,}}>
        <Text>This is Me hii.</Text> 
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Info"
          color="#222"
        />
        </View>
      );
    }
  }


  export class LogoutScreen extends React.Component {
    static navigationOptions = {
      title: 'Logout',
      drawerIcon: () =><Image resizeMode={'contain'}  style={{height: 20, width: 30}} source={require('../assets/LogoutIcon.png')}
                        />
    };

    
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{marginTop:30,}}>
        <Text>This is Me hii.</Text> 
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Info"
          color="#222"
        />
        </View>
      );
    }
  }