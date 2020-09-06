import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import QuestionsScreen from "./screens/question";
import AnswersScreen from './screens/answer'
import ProfileScreen, {AdsPostingScreen, PricingScreen, EasiTaxiScreen, EasyHomeDeliveryScreen, ContactUSScreen, LogoutScreen} from "./screens/profile";
import HelloWorld from "./screens/Hello";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/Register";
import ForgotPasswordScreen from "./screens/ForgotPassword";
import HomeScreen from "./screens/Home";
import SubCategoryScreen from "./screens/SubCategory";
import ListScreen from "./screens/List";
import DrawerContent from "./screens/DrawerScreen";
import Loader from './screens/LoaderScreen'
import LogoutScreenDetail from './screens/LogoutScreen'
import ContactDetailScreen from './screens/ContactDetail'
import AboutUs from './screens/AboutUs'
import SideMenu from './screens/SideMenu'
import LogoutHelper from './screens/LogoutHeloper'
import EditScreen from './screens/EditScreen'


import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  SafeAreaView,
  DrawerItems,
} from "react-navigation";

import { Header, Card, Icon, SearchBar, Button, Divider,  } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Emoji from 'react-native-emoji';


const AuthStackNavigation = createStackNavigator({
  LoginStack: { screen: LoginScreen,
    navigationOptions: ({ navigate, navigation }) => ({
      headerStyle: { backgroundColor: '#318080'},
      headerTitleStyle: {width: '100%', color: 'white', textAlign: 'center'},
      title: 'Login',
      headerLeft: 
      (
        
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('Home')  
            
            }
        >
            <Image resizeMode={'contain'}   /* <= changed  */
              style={{height: 20, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
          </TouchableWithoutFeedback>),
      headerRight: (
        <TouchableWithoutFeedback
          
        >
            <Image resizeMode={'contain'} style={{height: 30}} source={require('./assets/HomeIcon.png')}/>
          </TouchableWithoutFeedback>)
    }),
  },
  
  RegisterStack: { 
    screen: RegisterScreen,
    navigationOptions: ({ navigate, navigation }) => ({
      headerStyle: { backgroundColor: '#318080'},
      headerTitleStyle: {width: '100%', color: 'white', textAlign: 'center'},
      title: 'Creating Account',
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={() => navigation.goBack()}
        >
            <Image resizeMode={'contain'}   /* <= changed  */
              style={{height: 20, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
          </TouchableWithoutFeedback>),
      headerRight: (
        <TouchableWithoutFeedback
          
        >
            <Image resizeMode={'contain'} style={{height: 30}} source={require('./assets/HomeIcon.png')}/>
          </TouchableWithoutFeedback>)
    }), 
   },
   ForgotPasswordStack: { 
    screen: ForgotPasswordScreen,
    navigationOptions: ({ navigate, navigation }) => ({
      headerStyle: { backgroundColor: '#318080'},
      headerTitleStyle: { marginRight: 'auto', width: '100%', color: 'white',marginLeft: 'auto'},
      title: 'Forgot Password',
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={() => navigation.goBack()}
        >
            <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
          </TouchableWithoutFeedback>),
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Home')}
        >
            <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
          </TouchableWithoutFeedback>)
    }), 
   },
  })
  // const HeaderStackNavigation = createStackNavigator(
  //   {
  //       RegisterStack: { screen: RegisterScreen,
  //       navigationOptions: () => ({
  //           title: "Register",
  //         })
  //         },
  // })

export const Navigator = createDrawerNavigator(
  {
    Home_: createStackNavigator(
      {
        LogoutHelper1: { 
          screen: LogoutHelper,
          navigationOptions: () => ({
            title: 'Logout',
            headerTitleStyle: { 
              textAlign:"center", 
              flex:1 
          },
            drawerIcon: () =><Image
            resizeMode={'contain'} 
                                source={require("./assets/HomeIcon.png")}
                                style={{height: 20, width: 20}}
                              />
          }),
         },
      Home: { screen: HomeScreen,
          navigationOptions: ({ navigate, navigation }) => ({
            title: 'Easy Rent Sale',
            headerRight: (
              <Text></Text>
            ),  
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.openDrawer()}
              >
                  <Image style={{height: 30, width: 30, marginLeft: 10}} source={require('./assets/MenuIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {textAlign: 'center', flex: 1, color: 'white'},
          }),  },
        SubCategory: { 
          screen: SubCategoryScreen,
          navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {color: 'white', textAlign: 'center', flex: 1,},
            title: 'Sub Category List',
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
              >
                  <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerRight: (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
              >
                  <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
                </TouchableWithoutFeedback>)
          }),  
         },
         ListStack: { 
          screen: ListScreen,
          navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {color: 'white', textAlign: 'center', flex: 1},
            title: 'Easy Rent & Sell',
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
              >
                  <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerRight: (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
              >
                  <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
                </TouchableWithoutFeedback>)
          }),  
         },
         HomeStack: { 
          screen: HelloWorld,
          navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {color: 'white', textAlign: 'center', flex: 1},
            title: 'Houses',
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
              >
                  <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerRight: (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
              >
                  <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
                </TouchableWithoutFeedback>)
          }),  
         },
         Logout: { 
          screen: LogoutScreenDetail,
          navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {color: 'white', textAlign: 'center', flex: 1,},
            title: 'Logout',
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
              >
                  <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerRight: (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
              >
                  <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
                </TouchableWithoutFeedback>)
          }),    
         },

         EditStack: { 
          screen: EditScreen,
          navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {color: 'white', textAlign: 'center', flex: 1,},
            title: 'Edit Your Profile',
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
              >
                  <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerRight: (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
              >
                  <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
                </TouchableWithoutFeedback>)
          }),    
         },

         
         ContactDetail: { 
          screen: ContactDetailScreen,
          navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {color: 'white', textAlign: 'center', flex: 1,},
            title: 'Contact Us',
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
              >
                  <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerRight: (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
              >
                  <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
                </TouchableWithoutFeedback>)
          }),    
         },
         AboutUs: { 
          screen: AboutUs,
          navigationOptions: ({ navigate, navigation }) => ({
            headerStyle: { backgroundColor: '#318080'},
            headerTitleStyle: {color: 'white', textAlign: 'center', flex: 1,},
            title: 'About Us',
            headerLeft: (
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
              >
                  <Image style={{height: 20, width: 25, marginLeft: 10}} source={require('./assets/BackIcon.png')}/>
                </TouchableWithoutFeedback>),
            headerRight: (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
              >
                  <Image style={{height: 30, width: 30, marginRight: 20}} source={require('./assets/HomeIcon.png')}/>
                </TouchableWithoutFeedback>)
          }),    
         },
      },
      {
        initialRouteName: 'Home',
        navigationOptions: () => ({
          title: 'Home',
          headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        },
          drawerIcon: () =><Image
          resizeMode={'contain'} 
                              source={require("./assets/HomeIcon.png")}
                              style={{height: 20, width: 20}}
                            />
        }),

    }
      
      ),
    Profile: { screen: ProfileScreen },
    AdsPosting: { screen: AdsPostingScreen },
    Pricing: { screen: PricingScreen },
  },
  
  {  
    headerLayoutPreset: 'center', // default is 'left'
    drawerBackgroundColor: "#318080",
    contentComponent: SideMenu,
    contentOptions: {
        activeTintColor: 'white',
        itemsContainerStyle: {
          marginVertical: 0,
        },
        activeBackgroundColor:"orange",
    },
    
}
);
const MainNavigation = createSwitchNavigator({
    HomeDrawer: Navigator,
    AuthStack: AuthStackNavigation, // You will use this.props.navigation.replace('HomeDrawer') after login process.

    // HeaderNavigation: HeaderStackNavigation
    

  })
const Nav=createAppContainer(MainNavigation)

export default Nav;

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

