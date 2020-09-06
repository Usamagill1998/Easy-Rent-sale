import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,  
  ImageBackground,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native';
import { Toast } from 'native-base';
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
import { TouchableOpacity } from 'react-native-gesture-handler';

class SubCategoryScreen extends Component {

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
    this.props.navigation.navigate('Home');
    return true;
  }

  componentDidMount(){
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        "category_id": this.props.facebookToken.FirstLaunchCheck.category_id
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch('https://easyrentsale.com/api/getsubcategory', data)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result){
          this.setState({data: responseJson.data.category, isLoading: false})
        }
        else {
          this.setState({isLoading: false})
        }
      })
      .catch((error) =>{
        this.setState({isLoading: false})
        console.error(error);
      });

  }

  move(item){
    const {navigate} = this.props.navigation;
    let obj = {"subcategory_id": item.id, "subcategory_name": item.name}
    const result = Object.assign({}, this.props.facebookToken.FirstLaunchCheck, obj);
    this.props.dispatch(firstLaunchCheck(result))
    navigate('ListStack')
  }

  render() {
    const {navigate} = this.props.navigation;
    let Loading:any = '';
    if (this.state.isLoading) {
      Loading =   <DotIndicator color='white' />

    }
    else{
      Loading=<Text></Text>;
    }
    return (
      <ImageBackground source={require('../assets/BG.png')} style={styles.body}>

      <View style={styles.container}>
        {Loading}
        <ScrollView>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => 
          <View key={item.id} style={{flex: 1, margin: 20}}>
                <TouchableOpacity 
                    onPress={() => this.move(item) }>
                    <Text style={{color: 'white', fontSize: 18}}>{item.name}</Text>
                 </TouchableOpacity>
          </View>} //method to render the data in the way you want using styling u need
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
      firstLaunchCheck,
      INC
    };
  };
  export default connect(mapStateToProps, mapDispatchToEvents)(SubCategoryScreen)