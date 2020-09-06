import React from "react";
import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
import { StyleSheet, Text, View, ScrollView, ImageBackground, Button } from "react-native";
import Slideshow from 'react-native-image-slider-show';
import { BackHandler } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Linking} from 'react-native'
import call from 'react-native-phone-call'
import sms from 'react-native-sms-linking'
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

class HelloWorld extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            countries: [],
            country: '',
            data: {},
            isLoading: true
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.sms_helper = this.sms_helper.bind(this);
        this.call_helper = this.call_helper.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
      handleBackButtonClick() {
        this.props.navigation.navigate('ListStack');
        return true;
      }

    componentDidMount(){
        let data = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
            "token": "",
            "id": this.props.facebookToken.FirstLaunchCheck.product_id
          }),
          headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
          }
        }
    
        fetch('https://www.easyrentsale.com/api/getproduct', data)
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.result){
              this.setState({data: responseJson.data, isLoading: false})
              // this.setState({countries: responseJson.data.countries, isLoading: false})
            }
            else {
              this.setState({isLoading: false})
            }
          })
          .catch((error) =>{
            this.setState({isLoading: false})
          });
      }

    sms_helper(){
      if(!this.state.data.user.mobile_no){

          Toast.show({
              text: 'Number not found',
              buttonText: 'Okay',
              type: "danger"
               })
        return
      }
      sms(this.state.data.user.mobile_no).catch(console.error)
    }

    call_helper(){
      if(!this.state.data.user.mobile_no){

          Toast.show({
              text: 'Number not found',
              buttonText: 'Okay',
              type: "danger"
               })
        return
      }
    
      Linking.openURL(`tel:${this.state.data.user.mobile_no}`)
    }
    
    render() {
      let Loading:any = '';
    if (this.state.isLoading) {
      Loading =   <DotIndicator color='white' />

    }
    else{
      Loading=null;
    }
        const {navigate} = this.props.navigation;
        if(this.state.isLoading == false){
          let pic_data = []
          for(let i=0;i<this.state.data.pictures.length; i++){
              pic_data[i] = {url: this.state.data.pictures[i]}
          }
          if(pic_data.length == 0){ 


            pic_data[0] = 
          
          
            {uri: 'http://www.4motiondarlington.org/wp-content/uploads/2013/06/No-image-found.jpg'}
          }
          return (
            <ImageBackground source={require('../assets/BG.png')} style={styles.body}>

            <View style={styles.container}>
              {Loading}
                <Text style={{color: 'white', fontSize: 24}}>{this.state.data.title}</Text>
                <Text style={{color: 'white', fontSize: 12}}>{this.state.data.city.name} | Added at {this.state.data.created_at} | Ad ID : {this.state.data.post_id}</Text>
                <View style={{height: 200, alignSelf:'center'}}>
                    <Slideshow 
                    resizeMode={'contain'}   /* <= changed  */
                    style={{ height: 80, width: '60%', top: 30, bottom: 20}}
                    dataSource={pic_data}/>
                </View>
                <View style={{flex: 1}}>
                <ScrollView style={{flex: 0.8}}>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1/2}}>
                        <Text style={{margin: 5, color: 'white', fontSize: 10}}>User : {this.state.data.post_fields['Name of owner']}</Text>
                        <Text style={{margin: 5, color: 'white', fontSize: 10}}>Category : {this.state.data.subcategory.category.name}</Text>
                        <Text style={{margin: 5, color: 'white', fontSize: 10}}>Sub Category : {this.state.data.subcategory.name}</Text>
                    </View>
                    <View style={{flex: 1/2}}>
                        <Text style={{margin: 5, color: 'white', fontSize: 10}}>Country : {this.state.data.city.country.name}</Text>
                        <Text style={{margin: 5, color: 'white', fontSize: 10}}>City : {this.state.data.city.name}</Text>
                        <Text style={{margin: 5, color: 'white', fontSize: 10}}>Ad type Category : {this.state.data.type}</Text>
                        <Text style={{margin: 5, color: 'white', fontSize: 10}}>Condition : {this.state.data.condition}</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{color: 'white', fontSize: 16}}>Details</Text>  
                    <Text style={{alignSelf: 'center', fontSize: 20, color: 'white', margin: 10}}>Price: <Text style={{color: 'orange'}}>{this.state.data.price}</Text> </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', borderColor: 'white', borderRadius: 12, borderWidth: 3}}>
                    <View style={{flex: 0.3}}>
                        {Object.keys(this.state.data.post_fields).map((title) => <Text style={{height: 50, borderBottomWidth: 1,borderColor: 'white', color: 'white', fontSize: 12, padding: 10}}>{title}</Text>)}
                    </View>
                    <View style={{flex: 0.7}}>
                        {Object.values(this.state.data.post_fields).map((title) => <Text style={{height: 50, color: 'white', fontSize: 12, padding: 10, borderColor: 'white',borderLeftWidth: 1, borderBottomWidth: 1}}>{title}</Text>)}
                    </View>
                </View>  
                </ScrollView>
                <View style={{flex: 0.2}}>

                <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 5}}>
                    <View style={{flex: 0.5}}>
                      <TouchableOpacity
                        style={{padding: 11, margin: 6, backgroundColor: 'orange', borderColor: 'white', botderWidth: 3, borderRadius: 10}}
                        onPress={this.sms_helper}>
                        <Text style={{color: 'white', alignSelf: 'center'}}>SMS</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.5}}>
                    <TouchableOpacity
                        style={{padding: 11, margin: 6, backgroundColor: 'orange', borderColor: 'white', botderWidth: 3, borderRadius: 10}}
                        onPress={this.call_helper}
                      >

                        <Text style={{color: 'white', alignSelf: 'center'}}>CALL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>

                </View>
            </View>
            </ImageBackground>

        );
      }
      else{
        return(
          <ImageBackground source={require('../assets/BG.png')} style={styles.body}>
          <DotIndicator color='white' />
            </ImageBackground>

        )
      }

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
    body: {
      flex: 1,
      padding: 10,
    },
    container:{
        flex:1,
        padding:10,
        color: 'white'
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
  export default connect(mapStateToProps, mapDispatchToEvents)(HelloWorld)