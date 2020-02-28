import React, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";

var fireStore;

export default class ClockIn extends Component {
  constructor(props) {
     super(props);
     navigation = props.navigation;

     const dateTimeArray = new Date().toLocaleString().split(',');

     this.state = {
       date:dateTimeArray[0],
       time:dateTimeArray[1],
       diplayName:props.route.params.displayName,
     }

     fireStore = firebaseMain.firestore();


  }


  render() {
    return  <View style = {styles.container}>
      <ScrollView scrollEnabled={false}>
          <Text style={styles.displayText}>Hello,{this.props.route.params.displayName}, We noticed you aren't logged in. Would you like to login now?</Text>
          <Text style={styles.displayText}> Date: {this.state.date} </Text>
          <Text style={styles.displayText}> Time: {this.state.time} </Text>


        </ScrollView>
        <View style = {styles.footerContainer}>
          <TouchableOpacity
              style={styles.noButton}
              onPress={() => this.attemptClockIn()}
              underlayColor='#fff'>
              <Text style={styles.noButtonText}>No</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.yesButton}
              onPress={() => this.attemptClockIn()}
              underlayColor='#fff'>
              <Text style={styles.yesButtonText}>Yes</Text>
          </TouchableOpacity>
        </View>

      </View>
      }
      attemptClockIn() {
        fireStore.collection("users").doc(firebaseMain.auth().currentUser.email).update({clockedIn:true});
        navigation.navigate('LocaleSelector')
      }
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    flex:1,
    padding:20,
    paddingTop:45,
    justifyContent:'center',
    alignItems:'stretch',

  },

  displayText:{
    textAlign:'center',
    paddingTop:10,
    paddingBottom:10,
    fontSize:22,
  },
  infoText:{
    textAlign:'center',
    fontSize:13,
  },

  footerContainer: {
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'flex-end',
    paddingBottom:10,


  },
    yesButton:{
     marginRight:15,
     marginLeft:15,
     marginTop:10,
     paddingTop:10,
     paddingBottom:10,
     backgroundColor:'#1E6738',
     borderRadius:10,
     borderWidth: 1,
     borderColor: '#fff',
     flex:1,
   },
   yesButtonText:{
       color:'#fff',
       textAlign:'center',
       paddingLeft : 5,
       paddingRight : 5,
   },
  noButton:{
   marginRight:15,
   marginLeft:15,
   marginTop:10,
   paddingTop:10,
   paddingBottom:10,
   backgroundColor:'#8B0000',
   borderRadius:10,
   borderWidth: 1,
   borderColor: '#fff',
   flex:1,
 },
 noButtonText:{
     color:'#fff',
     textAlign:'center',
     paddingLeft : 5,
     paddingRight : 5,
 }


});
