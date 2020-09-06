import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import AnswersScreen from "./answer";

import { createStackNavigator, createAppContainer } from "react-navigation";

import { useSelector, useDispatch } from "react-redux";
import { firstLaunchCheck } from "../actions/index";

// class QuestionsScreen extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   static navigationOptions = {
//     title: "Questions"
//   };

//   QS() {
//     console.log("QS opened");
//     var v = useSelector(state => state.FirstLaunchCheck);
//     console.log("QS ", v);
//     return this.v;
//   }

//   a=this.QS();

//   render() {
//     const { navigate } = this.props.navigation;
//     //var v1=this.QS();
//     console.log("Render ");
//     //console.log(v1);
//     return (
//       <View>
//         <View>
//           <Text>hii  </Text>
//         </View>
//         <View>
//           <Button
//             title="Go to Answers hii"
//             onPress={() => navigate("Answers")}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// function QS() {
//   console.log("QS opened");
//   var v = useSelector(state => state.FirstLaunchCheck);
//   console.log("QS ", v);
//   return v;
// }


export default function QuestionsScreen (props) {
      const {navigate} = props.navigation;
      const v=useSelector(state=>state.FirstLaunchCheck);
      const dispatch=useDispatch();

      return (
        <View>
        <View>
        <Text style={{textAlign:"center",margin:10,fontSize:40,}}>State : {v} </Text>
        </View>
        <View>
        <Button
          title="Go to Answers "
          onPress={() => navigate('Answers')}
        />
        </View>
        <View style={{margin:20,marginTop:70,}}>
        <Button
          title="Increase state"
          onPress={()=>dispatch(firstLaunchCheck("56"))}         
        />
        </View>
        </View>
      );

}

// const MainNavigator = createStackNavigator({
//   Questions: { screen: QuestionsScreen,
//     navigationOptions: () => ({
//       title: 'Questions',
//       //headerBackTitle: null
//     }),  },
//   Answers: { screen: AnswersScreen }
// },

// );

// const App = createAppContainer(MainNavigator);

// export default App;
