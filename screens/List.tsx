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
  Alert,
  AsyncStorage,

} from 'react-native';
import {connect} from 'react-redux'
import { firstLaunchCheck, INC, DEC } from "../actions/index";
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
import { Container,CheckBox, Header, Content,Picker, Form } from "native-base";
import { Toast } from 'native-base';
import { SearchBar,Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



class ListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      all: true,
      sale: false,
      rent: false,
      isLoading: true,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.arrayholder = [];
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('SubCategory');
    return true;
  }


  componentDidMount(){
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "subcategory_id": this.props.facebookToken.FirstLaunchCheck.subcategory_id,
        "type": "all",
        "token": this.props.facebookToken.FirstLaunchCheck.token
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch('https://www.easyrentsale.com/api/product', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){
          this.setState({data: responseJson.data.products, isLoading: false})
            
          
        this.arrayholder = responseJson.data.products;


        } 
                else {
          this.setState({isLoading: false})
        }
      })
      .catch((error) =>{
        this.setState({isLoading: false})
      });

  }


  update(type){
    this.setState({
      all: false,
      rent: false,
      isLoading: true,
      sale: false, 
      data: []
    })
    if(type=='all'){
      this.setState({'all': true})
    }
    else if(type=='sale'){
      this.setState({'sale': true})
    }
    else if(type=='rent'){
      this.setState({'rent': true})
    }
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "subcategory_id": this.props.facebookToken.FirstLaunchCheck.subcategory_id,
        "type": type,
        "token": this.props.facebookToken.FirstLaunchCheck.token
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    
    fetch('https://www.easyrentsale.com/api/product', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){
          this.setState({data: responseJson.data.products, isLoading: false})
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

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} 
      }`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };



  move(item){
    let pass = this.props.facebookToken.FirstLaunchCheck
    const {navigate} = this.props.navigation;
    let obj = {"product_id": item.id}
    const result = Object.assign({}, pass, obj);
    this.props.dispatch(firstLaunchCheck(result))
    navigate("HomeStack")
  }

  
  render() {
    
    let Loading:any = '';
    if (this.state.isLoading) {
      Loading =   <DotIndicator color='#318080' />

    }
    else{
      Loading=null
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.05, height: 60, backgroundColor: '#318080', padding: 20}}>
         
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1/3, flexDirection: 'row'}}>
              <CheckBox
                    checked={this.state.all}
                    color="white"
                    onPress={() => this.update('all')}
                />
              <Text style={{color: 'white', left: 15}}>All</Text>
            </View>
            <View style={{flex: 1/3, flexDirection: 'row'}}>
              <CheckBox
                    checked={this.state.sale}
                    color="white"
                    onPress={() => this.update('sale')}
                />
              <Text style={{color: 'white', left: 15}}>Sale</Text>
            </View>
            <View style={{flex: 1/3, flexDirection: 'row'}}>
              <CheckBox
                    checked={this.state.rent}
                    color="white"
                    onPress={() => this.update('rent')}
                />
              <Text style={{color: 'white', left: 15}}>Rent</Text>
            </View>
          </View>
          
        </View>
        <View style={{flex:0.1}}>
          <View style={{ borderWidth: 2, margin: 10, borderRadius: 50, borderColor: '#318080'}}>
            <TextInput
              style={{padding: 8, height: 40}}
              underlineColorAndroid="transparent"
              placeholder='Search Here'
              errorStyle={{ color: 'red' }}
              errorMessage=''
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.value}
            />
          </View>
        </View>

    <View style={{flex: 0.85, marginTop:20}}>       
        {Loading}

        <ScrollView>
        <FlatList
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          renderItem={({item}) => 
          <View key={item.id} style={{flex: 1/2, margin: 3, padding: 3, borderColor: '#318080', backgroundColor: '#318080', borderRadius: 10, borderWidth: 2}}>
                <TouchableWithoutFeedback 
                    onPress={() => this.move(item)}>
                    <View>
                    <Image 
                        source={item.pictures[0] ? {uri: item.pictures[0]}: require("../assets/NoImageFound.jpeg")}
                        style={{height: 100, width: "100%"}} />
                        <Text style={{color: 'white', fontSize: 18}}>{item.title}</Text>
                        <Text style={{color: 'white', fontSize: 18}}>Price: {item.price}</Text>
                        <Text style={{color: 'white', fontSize: 18}}>Loc: {item.city.name}</Text>
                    </View>
                 </TouchableWithoutFeedback>
          </View>} //method to render the data in the way you want using styling u need
          />
        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     flex: 0.2,
      //backgroundColor: '#fff',
    }
});  
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
  export default connect(mapStateToProps, mapDispatchToEvents)(ListScreen)