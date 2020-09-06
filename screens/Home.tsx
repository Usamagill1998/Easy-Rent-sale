import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Alert,
  AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
import Loader from './LoaderScreen';
import { withNavigation } from 'react-navigation';
import { BackHandler } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
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

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], 
      isLoading: true,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }

  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.exitApp()
    // this.props.navigation.navigate('RegisterStack');
    return true;
  }

  componentDidMount(){
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "token": this.props.facebookToken.FirstLaunchCheck.token,
        "category_id": ''
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch('https://easyrentsale.com/api/getcategory', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){

          for (var i = responseJson.data.category.length - 1; i >= 0; i--) {
            responseJson.data.category[i].image = '../assets/' + responseJson.data.category[i].id + '.png'
          }
          this.setState({data: responseJson.data.category, isLoading: false})
        }
        else {
          this.setState({isLoading: false})
        }
      })
      .catch((error) =>{
        this.setState({isLoading: false})
      });

  }


  avatarImage(name) {
    switch (name) {
      case "../assets/1.png":
        return require("../assets/1.png");
      case "../assets/2.png":
        return require("../assets/2.png");
      case "../assets/3.png":
        return require("../assets/3.png");
      case "../assets/4.png":
        return require("../assets/4.png");
      case "../assets/5.png":
        return require("../assets/5.png");
      case "../assets/6.png":
        return require("../assets/6.png");
      case "../assets/7.png":
        return require("../assets/7.png");
      case "../assets/8.png":
        return require("../assets/8.png");
      case "../assets/9.png":
        return require("../assets/9.png");
      case "../assets/12.png":
        return require("../assets/12.png");
      case "../assets/11.png":
        return require("../assets/11.png");
      case "../assets/13.png":
        return require("../assets/13.png");
      case "../assets/14.png":
        return require("../assets/14.png");
      case "../assets/15.png":
        return require("../assets/15.png");
      case "../assets/16.png":
        return require("../assets/16.png");
      case "../assets/17.png":
        return require("../assets/17.png");
     case "../assets/18.png":
        return require("../assets/18.png");
      case "../assets/19.png":
        return require("../assets/19.png");
      case "../assets/21.png":
        return require("../assets/21.png");
      case "../assets/22.png":
        return require("../assets/22.png");
      case "../assets/1.png":
        return require("../assets/1.png");
      default:
        return require('../assets/1.png');
    }
  }

  move(item){
    const {navigate} = this.props.navigation;
    let obj = {"category_id":item.id, "category_name": item.name}
    const result = Object.assign({}, this.props.facebookToken.FirstLaunchCheck, obj);
    this.props.dispatch(firstLaunchCheck(result))
    navigate('SubCategory')
  }

  render() {
    const {navigate} = this.props.navigation;
    let Loading:any = '';
    if (this.state.isLoading) {
      Loading =   <DotIndicator color='white' />

    }
    else{
      Loading=null;
    }

    return (
      <ImageBackground source={require('../assets/BG.png')} style={styles.body}>

      <View style={styles.container}> 
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 15, padding: 5}}>WELCOME TO <Text style={{color: '#F7810A'}}>EASY</Text>
        </Text>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 15, padding: 5}}>Choose Your Service</Text>
        {Loading}

        <ScrollView>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => 
          <View key={item.id} style={{flex: 1/3, marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                <TouchableWithoutFeedback 
                onPress={()=> this.move(item)}>
                <Image source={this.avatarImage(item.image)}
                 style={{height: 70, width: 70}} />
                 </TouchableWithoutFeedback>
          </View>} //method to render the data in the way you want using styling u need
          horizontal={false}
          numColumns={3}
          />   
        </ScrollView>
      </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      padding: 10,
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
  export default connect(mapStateToProps, mapDispatchToEvents)(withNavigation(HomeScreen))
     