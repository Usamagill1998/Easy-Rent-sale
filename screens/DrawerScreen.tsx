import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Alert, 
  ScrollView
} from 'react-native';

export default class DrawerContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        color: [true, false, false, false,false,false]
      }
      this.changeColor = this.changeColor.bind(this)
  }

  changeColor(id){
      for(var i=0;i<this.state.color.length;i++){
          this.state.color[i] = false;
      }
      this.state.color[id] =true
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={{flexDirection: 'row', height: 150, margin: 20, backgroundColor: '#048080',marginTop:20}}>
          <View style={{flex: 0.5,marginTop:10}}>
            <Image
              source={require('../assets/Abdul.jpg')}
              style={{height: 20, width: 80, borderRadius: 80/2}}
            />
          </View>
          <View style={{flex: 0.5, justifyContent:'center'}}>
            <Text style={{color: 'white'}}>Abdul Rahman</Text>
            <Text style={{color: 'white'}}>0333-333333</Text>
            <View style={{alignSelf: 'flex-end', margin: 10}}>
            </View>
          </View>
        </View>

        <View style={[this.state.color[0] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
              <TouchableWithoutFeedback 
                onPress={() => {this.changeColor(0)}}  

              >
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Home</Text>
              </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[this.state.color[1] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
          <TouchableWithoutFeedback 
                onPress={() => {this.changeColor(1)}}  

              >
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Ads</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[this.state.color[2] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
          <TouchableWithoutFeedback 
                onPress={() => {this.changeColor(2)}}  

              >
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>Ads Posting</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[this.state.color[3] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
          <TouchableWithoutFeedback 
                onPress={() => {this.changeColor(3)}}  

              >
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Pricing</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[this.state.color[4] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
          <TouchableWithoutFeedback 
                onPress={() => {this.changeColor(4)}}  

              >
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Easy Taxi</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[this.state.color[5] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
          <TouchableWithoutFeedback 
                onPress={() => {this.changeColor(5)}}  

              >
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Easi Home Delivery</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[this.state.color[0] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Contact Us</Text>
            
          </View>
        </View>
        <View style={[this.state.color[0] ? styles.textinvalid : styles.textvalid]}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 0.7, justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Logout</Text>
          </View>
        </View>
        
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#318080',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  danger : {
    color: 'red',

  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  textinvalid:{
      backgroundColor: 'black',
      flexDirection: 'row', height: 50, 
  },
  textvalid: {
    flexDirection: 'row', height: 50, 
  }
});